import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { AlertTriangle, X } from 'lucide-react';

// Schemas
import { editCategorieSchema } from '../../../../schemas/categorie';

// Types
import { EquipmentCategory } from '../../../../types/equipment';

// Components
import { Button } from '../../../ui/button';
import CategoryFields from '../../../form/equipments/categorie';
import { Form } from '../../../ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../ui/dialog';
import EquipmentService from '../../../../services/equipment.service';

type CategoryFormValues = z.infer<typeof editCategorieSchema>;

interface EditCategoryProps {
  category: EquipmentCategory;
  onClose: () => void;
  isOpen: boolean;
}

const EditCategory = ({ category, onClose, isOpen }: EditCategoryProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const equipmentService = new EquipmentService();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(editCategorieSchema),
    defaultValues: {
      id: category.id,
      name: category.name,
      type: category.type,
      description: category.description,
      photo: category.photo || [],
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        id: category.id,
        name: category.name,
        type: category.type,
        description: category.description,
        photo: category.photo || [],
      });
    }
  }, [isOpen, category, form]);

  const handleSubmit = async (data: CategoryFormValues) => {
    try {
      const response = await equipmentService.editCategory(category.id, data);
      toast.success(response.data.message || 'La catégorie a été modifiée avec succès');
      form.reset();
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error: unknown) {
      const errorResponse = error as { response: { data: { message: string } } };
      toast.error(errorResponse.response?.data.message || "Une erreur est survenue lors de l'ajout de la catégorie");
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-start">
              <DialogTitle>Modifier la catégorie</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCloseAttempt}
                aria-label="Fermer"
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>
              Modifier les détails de la catégorie {category.name}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <CategoryFields />

              <DialogFooter className="gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseAttempt}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={!form.formState.isDirty || form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Unsaved changes confirmation dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Modifications non enregistrées
            </DialogTitle>
            <DialogDescription>
              Des modifications ont été effectuées mais n'ont pas été
              enregistrées. Si vous quittez maintenant, ces modifications seront
              perdues.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Continuer l'édition
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmClose}
            >
              Quitter sans enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditCategory;