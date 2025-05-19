import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Skeleton } from '../../components/ui/skeleton';
import EquipmentDetails from '../../components/dashboard/equipments/EquipmentDetails';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';
import LoadingOverlay from '../../components/LoadingOverlay';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import EquipmentService from '../../services/equipment.service';
import { Equipment } from '../../types/equipment';


const EquipmentPage = () => {
    const { id } = useParams<{ id: string }>();
    const [equipment, setEquipment] = useState<Equipment | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const equipmentService = new EquipmentService();

    useEffect(() => {
        if (!id) {
            setError('ID d\'équipement manquant');
            setIsLoading(false);
            return;
        }

        const fetchEquipmentData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await equipmentService.getEquipment(id);
                console.log(response.data);
                if (!response.data) {
                    throw new Error('Équipement non trouvé');
                }
                setEquipment(response.data);
            } catch (error) {
                console.error('Fetch equipment error:', error);
                const errorMessage = error instanceof Error
                    ? error.message
                    : "Impossible de charger les données de l'équipement";
                setError(errorMessage);
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEquipmentData();
    }, [id]);

    if (!id) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
                <Card className="w-full max-w-2xl">
                    <CardContent className="p-6">
                        <Alert variant="destructive">
                            <ExclamationTriangleIcon className="h-4 w-4" />
                            <AlertTitle>Erreur</AlertTitle>
                            <AlertDescription>
                                ID d'équipement manquant dans l'URL
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="space-y-4">
                    <Skeleton className="h-10 w-[200px]" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-24" />
                        ))}
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <Card>
                    <CardHeader>
                        <CardTitle>Erreur</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Alert variant="destructive">
                            <ExclamationTriangleIcon className="h-4 w-4" />
                            <AlertDescription>
                                {error}
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            );
        }

        if (!equipment) {
            return (
                <Card>
                    <CardHeader>
                        <CardTitle>Aucune donnée disponible</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Alert variant="default">
                            <AlertDescription>
                                Aucune donnée disponible pour cet équipement
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            );
        }

        return (
            <>
                <div className="w-full">
                    <EquipmentDetails equipment={equipment} onUpdate={setEquipment} />
                </div>
                <div className="mt-8">
                    Tableau des des demandes en attentes a faire et historique
                    {/* <EquipmentHistory
                        history={equipment.history}
                        equipmentName={equipment.name}
                    /> */} a faire


                </div>
            </>
        );
    };

    return (
        <div className="relative min-h-screen">
            {isLoading && <LoadingOverlay loadingText="Chargement de l'équipement..." />}

            <div className="container py-8 space-y-6">
                {renderContent()}
            </div>
        </div>
    );
};

export default EquipmentPage;