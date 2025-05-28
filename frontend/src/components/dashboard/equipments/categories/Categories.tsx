import { useState, useEffect } from "react";
import { FileDown, Plus, RefreshCw } from "lucide-react";
import EquipmentService from "../../../../services/equipment.service";
import { EquipmentCategory } from "../../../../types/equipment";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { exportDataToCSV } from "../../../../utils/membersUtils";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { BaseDataTable } from "../../BaseDataTable";
import { columns } from "./columns";
import CategoriesStats from "./stats";


const Categories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<EquipmentCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState("");

    const equipmentService = new EquipmentService();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await equipmentService.getAllCategories();

            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Erreur lors de la récupération des catégories");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    //Gestion locale
    const handleCategoryUpdate = (updatedCategory: EquipmentCategory) => {
        setCategories(prevCategories =>
            prevCategories.map(category =>
                category.id === updatedCategory.id ? updatedCategory : category
            )
        );
    };


    const handleCategoryDelete = (deletedCategoryId: string) => {
        setCategories(prevCategories =>
            prevCategories.filter(category => category.id !== deletedCategoryId)
        );
    };


    const filteredCategories = categories && categories.filter(category =>
        category.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
        category.type.toLowerCase().includes(globalFilter.toLowerCase())
    );

    return (
        <div className="space-y-6 " >
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Gestion des catégories d'équipement</h1>
                <div className="flex gap-2">
                    <Button
                        variant="default"
                        size="sm"
                        onClick={() => navigate("/materiels/categories/ajouter")}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Nouvelle catégorie
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportDataToCSV(categories, "categories-equipement")}
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

            {/* Filtre de recherche */}
            <div className="flex gap-4">
                <Input
                    placeholder="Rechercher une catégorie..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="w-full md:w-[300px]"
                />
            </div>
            <CategoriesStats categories={filteredCategories} />


            <BaseDataTable
                columns={columns({
                    onCategoryUpdate: handleCategoryUpdate,
                    onCategoryDelete: handleCategoryDelete
                })}
                data={filteredCategories}
                isLoading={isLoading}
                onRefresh={fetchData}
            />
        </div>
    );
};

export default Categories;