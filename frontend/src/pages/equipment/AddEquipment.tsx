
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import EquipmentFields from '../../components/form/equipments/equipment';
import { Form } from '../../components/ui/form';

import EquipmentService from '../../services/equipment.service';
import { useNavigate } from 'react-router-dom';
import { equipmentSchema } from '../../schemas/equipment';


type EquipmentFormValues = z.infer<typeof equipmentSchema>;

const AddEquipment = () => {
    const form = useForm<EquipmentFormValues>({
        resolver: zodResolver(equipmentSchema),
        defaultValues: {
            name: '',
            categoryId: '',
            cost: 0,
            specifications: {},
            photo: []
        }
    });

    const { isValid, errors } = form.formState;
    const navigate = useNavigate();
    const equipmentService = new EquipmentService();
    const onSubmit = async (data: EquipmentFormValues) => {
        try {
            console.log(isValid);
            console.log(errors);
            console.log(data);
            const response = await equipmentService.addEquipment(data);
            console.log(data);
            toast.success(response.data.message || "L'équipement a été ajoutée avec succès");
            form.reset();
            setTimeout(() => {
                navigate('/materiels');
            }, 2000);
        } catch (error: unknown) {
            const errorResponse = error as { response: { data: { message: string } } };
            toast.error(errorResponse.response?.data.message || "Une erreur est survenue lors de l'ajout de l'équipement");
        }
    };

    return (
        <Card className="p-4 w-full mx-auto">
            <CardHeader>
                <CardTitle>Ajouter un equipment</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <EquipmentFields />
                        <div className="flex justify-end gap-4">
                            <Button type='reset' className='w-full sm:w-auto' variant="outline">
                                Annuler
                            </Button>
                            <Button type="submit" className="w-full sm:w-auto" variant="default" disabled={!isValid}>
                                Ajouter l'équipement
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default AddEquipment;