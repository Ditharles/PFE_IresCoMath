import { useState, useCallback } from "react";
import { toast } from "sonner";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "../../ui/dialog";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem
} from "../../ui/dropdown-menu";
import { Equipment } from "../../../types/equipment";
import { Button } from "../../ui/button";
import EditEquipment from "./EditEquipment";
import EquipmentService from "../../../services/equipment.service";

interface ActionsCellProps {
    equipment: Equipment;
    onUpdate: (updatedEquipment: Equipment) => void;
    onDelete: (deletedEquipmentId: string) => void;
    className?: string;
}

const ActionsCell = ({
    equipment,
    onUpdate,
    onDelete,
    className = ""
}: ActionsCellProps) => {
    const equipmentService = new EquipmentService();
    const navigate = useNavigate();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDelete = useCallback(async () => {
        try {
            setIsSubmitting(true);
            await equipmentService.deleteEquipment(equipment.id);
            toast.success("Équipement supprimé avec succès");
            onDelete(equipment.id);
            setIsDeleteDialogOpen(false);
        } catch (error) {
            console.error("Erreur lors de la suppression de l'équipement:", error);
            toast.error("Une erreur est survenue lors de la suppression");
        } finally {
            setIsSubmitting(false);
        }
    }, [equipment.id, onDelete]);

    const handleUpdate = useCallback(() => {
        setIsEditDialogOpen(true);
    }, []);

    const handleViewDetails = () => navigate(`/materiel/${equipment.id}`);

    const menuItems = [
        {
            label: "Voir détails",
            icon: <Eye className="h-4 w-4 mr-2" />,
            action: handleViewDetails,
            disabled: false
        },
        {
            label: "Modifier",
            icon: <Edit className="h-4 w-4 mr-2" />,
            action: handleUpdate,
            disabled: false
        },
        {
            label: "Supprimer",
            icon: <Trash2 className="h-4 w-4 mr-2" />,
            action: () => setIsDeleteDialogOpen(true),
            disabled: isSubmitting,
            isDestructive: true
        }
    ];

    const handleMenuItemClick = useCallback((action: () => void) => {
        setDropdownOpen(false);
        setTimeout(() => {
            action();
        }, 100);
    }, []);

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        aria-label="Menu actions"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="min-w-[200px] bg-white rounded-md shadow-lg p-1 border border-gray-100"
                    onClick={(e) => e.stopPropagation()}
                >
                    <DropdownMenuLabel className="px-2 py-1 text-sm font-semibold text-gray-700">
                        Actions
                    </DropdownMenuLabel>

                    {menuItems.map((item, index) => (
                        <DropdownMenuItem
                            key={index}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleMenuItemClick(item.action);
                            }}
                            disabled={item.disabled}
                            className={`flex items-center px-2 py-1.5 text-sm rounded cursor-pointer
                                ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                                ${item.isDestructive ? 'text-red-600 hover:bg-red-50' : 'hover:bg-gray-50'}
                            `}
                        >
                            {item.icon}
                            {item.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md" onClick={(e) => e.stopPropagation()}>
                    <DialogHeader>
                        <DialogTitle>Confirmer la suppression</DialogTitle>
                        <DialogDescription>
                            Êtes-vous sûr de vouloir supprimer l'équipement "{equipment.name}" ? Cette action est irréversible.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-2 mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            disabled={isSubmitting}
                        >
                            Annuler
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Suppression...' : 'Confirmer'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Equipment Dialog */}
            {isEditDialogOpen && (
                <EditEquipment
                    equipment={equipment}
                    isOpen={isEditDialogOpen}
                    onClose={() => setIsEditDialogOpen(false)}
                    onSuccess={(updatedEquipment) => {
                        setIsEditDialogOpen(false);
                        onUpdate(updatedEquipment);
                    }}
                />
            )}
        </div>
    );
};

export default ActionsCell;