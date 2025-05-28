import { useState, useEffect } from "react";
import { FileDown, Plus, RefreshCw } from "lucide-react";

import { columns } from "./columns";
import EquipmentStats from "./stats";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EquipmentService from "../../../services/equipment.service";
import { Equipment, EquipmentCategory, EquipmentStatus } from "../../../types/equipment";
import { exportDataToCSV } from "../../../utils/membersUtils";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { BaseDataTable } from "../BaseDataTable";

const Equipments = ({ isCategoryPage = false, equipmentsCategory, pendingDelivery }: { isCategoryPage: boolean, equipmentsCategory?: EquipmentCategory, pendingDelivery?: boolean }) => {
    const navigate = useNavigate();
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [categories, setCategories] = useState<EquipmentCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState("");

    const equipmentService = new EquipmentService();

    const fetchData = async () => {
        setIsLoading(true);

        try {
            if (isCategoryPage) {
                if (!equipmentsCategory) {
                    throw new Error('Aucune catégorie spécifiée');
                }
                setEquipments(equipmentsCategory.equipments ?? []);
            } else {
                const [equipmentsRes, categoriesRes] = await Promise.all([
                    equipmentService.getAllEquipments(),
                    equipmentService.getAllCategories()
                ]);

                let filteredEquipments = equipmentsRes.data;
                console.log(pendingDelivery);
                if (pendingDelivery) {
                    filteredEquipments = equipmentsRes.data.filter(
                        (equipment: Equipment) => equipment.status === EquipmentStatus.PENDING_DELIVERY
                    );
                }

                setEquipments(filteredEquipments);
                setCategories(categoriesRes.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            const errorMessage = error instanceof Error
                ? error.message
                : "Erreur lors de la récupération des données";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pendingDelivery]);

    const handleEquipmentUpdate = (updatedEquipment: Equipment) => {
        console.log(updatedEquipment);
        setEquipments(prevEquipments =>
            prevEquipments.map(equipment =>
                equipment.id === updatedEquipment.id ? updatedEquipment : equipment
            )
        );
    };

    const handleEquipmentDelete = (deletedEquipmentId: string) => {
        setEquipments(prevEquipments =>
            prevEquipments.filter(equipment => equipment.id !== deletedEquipmentId)
        );
    };

    const filteredEquipments = equipments.filter(equipment => {
        const searchTerm = globalFilter.toLowerCase();
        return (
            equipment.name.toLowerCase().includes(searchTerm) ||
            (equipment.category?.name.toLowerCase().includes(searchTerm)) ||
            (equipment.category?.type.toLowerCase().includes(searchTerm))
        );
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{isCategoryPage ? "Equipements de la categorie" : "Tous les équipements"}</h1>
                <div className="flex gap-2">
                    <Button
                        variant="default"
                        size="sm"
                        onClick={() => isCategoryPage ? navigate(`/materiels/categories/ajouter/${equipmentsCategory?.id}`) : navigate(`/materiels/nouveau-materiel`)}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Nouvel équipement
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportDataToCSV(equipments, "liste-equipements")}
                    >
                        <FileDown className="h-4 w-4 mr-2" />
                        Exporter
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchData}
                        disabled={isLoading}
                    >
                        <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                        Actualiser
                    </Button>
                </div>
            </div>

            <div className="flex gap-4">
                <Input
                    placeholder="Rechercher un équipement..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="w-full md:w-[300px]"
                />
            </div>

            <EquipmentStats equipments={filteredEquipments} />

            <BaseDataTable
                columns={columns({
                    onUpdate: handleEquipmentUpdate,
                    onDelete: handleEquipmentDelete,
                    categories,
                    isCategoryPage: false
                })}
                data={filteredEquipments}
                isLoading={isLoading}
                onRefresh={fetchData}
            />
        </div>
    );
};

export default Equipments;