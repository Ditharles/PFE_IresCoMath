import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';
import { editEquipmentSchema } from '../../../schemas/equipment';
import EquipmentService from '../../../services/equipment.service';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Form } from '../../ui/form';
import EquipmentFields from '../../form/equipments/equipment';
import { Equipment } from '../../../types/equipment';

type EquipmentFormValues = z.infer<typeof editEquipmentSchema>;

interface EditEquipmentProps {
    equipment: Equipment;
    onClose: () => void;
    isOpen: boolean;
    onSuccess: (equipment: Equipment) => void;
}

const EditEquipment = ({ equipment, onClose, isOpen, onSuccess }: EditEquipmentProps) => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const equipmentService = new EquipmentService();
    console.log(equipment);
    const form = useForm<EquipmentFormValues>({
        resolver: zodResolver(editEquipmentSchema),
        shouldUnregister: true,
        defaultValues: {
            id: equipment.id,
            name: equipment.name,
            cost: equipment.cost,
            categoryId: equipment.category?.id,
            status: equipment.status,
            acquisitionDate: equipment.acquisitionDate ? new Date(equipment.acquisitionDate) : undefined,
            specifications: equipment.specifications || {},
            photo: equipment.photo || [],
        },
    });

    useEffect(() => {
        if (isOpen) {
            form.reset({
                id: equipment.id,
                name: equipment.name,
                categoryId: equipment.category?.id,
                cost: equipment.cost,
                status: equipment.status,
                specifications: equipment.specifications || {},
                acquisitionDate: equipment.acquisitionDate ? new Date(equipment.acquisitionDate) : undefined,
                photo: equipment.photo || [],
            });
        }
    }, [isOpen, equipment, form]);

    const handleSubmit = async (data: EquipmentFormValues) => {
        try {
            console.log(equipment.id);
            const response = await equipmentService.editEquipment(equipment.id, data);
            toast.success(response.data.message || 'Équipement mis à jour avec succès');
            form.reset();
            onSuccess(response.data.equipment);
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error: unknown) {
            const errorResponse = error as { response: { data: { message: string } } };
            toast.error(errorResponse.response?.data.message || "Erreur lors de la mise à jour de l'équipement");
        }
    };

    const handleCloseAttempt = () => {
        if (form.formState.isDirty) {
            setShowConfirmDialog(true);
        } else {
            onClose();
        }
    };

    const handleConfirmClose = () => {
        form.reset();
        setShowConfirmDialog(false);
        onClose();
    };

    return (
        <>
            {/* Main edit dialog */}
            <Dialog open={isOpen} onOpenChange={handleCloseAttempt}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background text-foreground border-border">
                    <DialogHeader className="bg-muted/50 p-4 rounded-t-lg">
                        <div className="flex justify-between items-start">
                            <DialogTitle className="text-foreground">Modifier l'équipement</DialogTitle>
                        </div>
                        <DialogDescription className="text-muted-foreground">
                            Modifier les détails de l'équipement {equipment.name}
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-4">
                            <EquipmentFields />

                            <DialogFooter className="gap-2 pt-4 border-t border-border">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCloseAttempt}
                                    disabled={form.formState.isSubmitting}
                                    className="cursor-pointer hover:bg-muted"
                                >
                                    Annuler
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={!form.formState.isDirty || form.formState.isSubmitting}
                                    className="cursor-pointer"
                                >
                                    {form.formState.isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Unsaved changes confirmation dialog */}
            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <DialogContent className="max-w-md bg-background text-foreground border-border">
                    <DialogHeader className="bg-muted/50 p-4 rounded-t-lg">
                        <DialogTitle className="flex items-center gap-2 text-foreground">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            Modifications non enregistrées
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Vous avez des modifications non enregistrées. Si vous quittez maintenant,
                            ces modifications seront perdues.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="gap-2 mt-4 border-t border-border p-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowConfirmDialog(false)}
                            className="cursor-pointer hover:bg-muted"
                        >
                            Continuer l'édition
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleConfirmClose}
                            className="cursor-pointer"
                        >
                            Quitter sans enregistrer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EditEquipment;