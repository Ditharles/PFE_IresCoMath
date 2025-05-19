/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { toast } from "sonner";
import { MoreHorizontal, Eye, Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "../../../ui/dialog";

import { Button } from "../../../ui/button";
import EditCategory from "./EditCategory";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../../../ui/dropdown-menu";
import { EquipmentCategory } from "../../../../types/equipment";

interface ActionsCellProps {
    category: EquipmentCategory;
    onCategoryUpdate: (updatedCategory: EquipmentCategory) => void;
    onCategoryDelete: (deletedCategoryId: string) => void;
    className?: string;
}

const ActionsCell = ({
    category,
    onCategoryUpdate,
    onCategoryDelete,
    className = ""
}: ActionsCellProps) => {
    const navigate = useNavigate();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Pour gérer l'état ouvert du menu déroulant
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDelete = async () => {
        try {
            setIsSubmitting(true);
            onCategoryDelete(category.id);
        } catch (error) {
            console.error("Erreur lors de la suppression de la catégorie:", error);
            toast.error("Une erreur est survenue lors de la suppression");
        } finally {
            setIsSubmitting(false);
            setIsDeleteDialogOpen(false);
        }
    };

    const menuItems = [
        {
            label: "Voir détails",
            icon: <Eye className="h-4 w-4 mr-2" />,
            action: () => navigate(`/materiels/categories/${category.id}`),
            disabled: false
        },
        {
            label: "Ajouter équipement",
            icon: <Plus className="h-4 w-4 mr-2" />,
            action: () => navigate(`/materiels/ajouter-materiel/${category.id}`),
            disabled: false
        },
        {
            label: "Modifier",
            icon: <Edit className="h-4 w-4 mr-2" />,
            action: () => setIsEditDialogOpen(true),
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

   
    const handleMenuItemClick = (actionFn) => {
      
        setDropdownOpen(false);

     
        setTimeout(() => {
            
            actionFn();
        }, 100);
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        aria-label="Menu actions"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="min-w-[200px] bg-white rounded-md shadow-lg p-1 border border-gray-100"
                >
                    <DropdownMenuLabel className="px-2 py-1 text-sm font-semibold text-gray-700">
                        Actions
                    </DropdownMenuLabel>

                    {menuItems.map((item, index) => (
                        <DropdownMenuItem
                            key={index}
                            onClick={() => handleMenuItemClick(item.action)}
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
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirmer la suppression</DialogTitle>
                        <DialogDescription>
                            Êtes-vous sûr de vouloir supprimer la catégorie "{category.name}" ?
                            Cette action est irréversible et supprimera tous les équipements associés.
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

            <EditCategory
                category={category}
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
            />
        </div>
    );
};

export default ActionsCell;