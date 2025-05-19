
import { categorieSchema } from '../../schemas/categorie';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import CategoryFields from '../../components/form/equipments/categorie';
import { Form } from '../../components/ui/form';

import EquipmentService from '../../services/equipment.service';
import { useNavigate } from 'react-router-dom';

type CategoryFormValues = z.infer<typeof categorieSchema>;

const AddCategory = () => {
    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorieSchema),
        defaultValues: {
            name: '',
            type: '',
            description: '',
            photo: []
        }
    });

    const navigate = useNavigate();
    const equipmentService = new EquipmentService();
    const onSubmit = async (data: CategoryFormValues) => {
        try {
            const response = await equipmentService.addCategory(data);
            console.log(data);
            toast.success(response.data.message || "La catégorie a été ajoutée avec succès");
            form.reset();
            setTimeout(() => {
                navigate('/materiels/inventaire');
            }, 2000);
        } catch (error: unknown) {
            const errorResponse = error as { response: { data: { message: string } } };
            toast.error(errorResponse.response?.data.message || "Une erreur est survenue lors de l'ajout de la catégorie");
        }
    };

    return (
        <Card className="w-full mx-auto">
            <CardHeader>
                <CardTitle>Ajouter une catégorie</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <CategoryFields />
                        <div className="flex justify-end gap-4">
                            <Button type='reset' className='w-full sm:w-auto' variant="outline">
                                Annuler
                            </Button>
                            <Button type="submit" className="w-full sm:w-auto" variant="default">
                                Ajouter la catégorie
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default AddCategory;