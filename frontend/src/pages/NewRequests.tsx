import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestsService from '../services/requests.service';

import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip';

export enum RequestType {
    MISSION = 'MISSION',
    INTERNSHIP = 'INTERNSHIP',
    CONFERENCE = 'CONFERENCE',
    EQUIPMENT_PURCHASE = 'EQUIPMENT_PURCHASE',
    EQUIPMENT_LOAN = 'EQUIPMENT_LOAN',
    TRAVEL_ACCOMMODATION = 'TRAVEL_ACCOMMODATION',
    REPAIR_MAINTENANCE = 'REPAIR_MAINTENANCE',
    CONTRACTUAL = 'CONTRACTUAL',
    ARTICLE_REGISTRATION = 'ARTICLE_REGISTRATION'
}

const requestTypeDetails: Record<RequestType, { label: string; description: string }> = {
    [RequestType.MISSION]: {
        label: 'Mission',
        description: "Déplacement professionnel à l'étranger"
    },
    [RequestType.INTERNSHIP]: {
        label: 'Stage',
        description: 'Demande de stage académique à l\'étranger'
    },
    [RequestType.CONFERENCE]: {
        label: 'Conférence',
        description: 'Participation à un événement scientifique'
    },
    [RequestType.EQUIPMENT_PURCHASE]: {
        label: 'Achat matériel',
        description: 'Demande d\'achat de matériel'
    },
    [RequestType.EQUIPMENT_LOAN]: {
        label: 'Prêt matériel',
        description: 'Demande de prêt temporaire de matériel'
    },
    [RequestType.TRAVEL_ACCOMMODATION]: {
        label: 'Déplacement & Hébergement',
        description: 'Frais de déplacement'
    },
    [RequestType.REPAIR_MAINTENANCE]: {
        label: 'Réparation & Maintenance',
        description: 'Demande de maintenance'
    },
    [RequestType.CONTRACTUAL]: {
        label: 'Contractuel',
        description: 'Engagement d\'un personnel contractuel'
    },
    [RequestType.ARTICLE_REGISTRATION]: {
        label: 'Inscription Article',
        description: 'Frais de publication scientifique'
    },
};

const NewRequests = () => {
    const navigate = useNavigate();
    const requestService = new RequestsService();
    const [availableRequests, setAvailableRequests] = useState<RequestType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPossibleRequests = async () => {
            try {
                setLoading(true);
                const response = await requestService.getPossibleRequests();
                if (!response || !response.data) {
                    throw new Error('Réponse invalide du serveur');
                }
                setAvailableRequests(response.data);
            } catch (err) {
                console.error('Failed to fetch possible requests:', err);
                setError('Impossible de charger les types de demandes disponibles');
            } finally {
                setLoading(false);
            }
        };

        fetchPossibleRequests();
    }, []);

    const handleRequestClick = (requestType: RequestType) => {
        const routeMap: Record<RequestType, string> = {
            [RequestType.MISSION]: 'mission',
            [RequestType.INTERNSHIP]: 'stage',
            [RequestType.CONFERENCE]: 'conference',
            [RequestType.EQUIPMENT_PURCHASE]: 'achat-materiel',
            [RequestType.EQUIPMENT_LOAN]: 'pret-materiel',
            [RequestType.TRAVEL_ACCOMMODATION]: 'voyage-hebergement',
            [RequestType.REPAIR_MAINTENANCE]: 'reparation-maintenance',
            [RequestType.CONTRACTUAL]: 'contractuel',
            [RequestType.ARTICLE_REGISTRATION]: 'inscription-article'
        };

        navigate(`/nouvelle-demande/${routeMap[requestType]}`);
    };

    if (loading) {
        return (
            <Card className="w-full max-w-6xl mx-auto">
                <CardHeader>
                    <CardTitle>Nouvelle Demande</CardTitle>
                    <CardDescription>Chargement des types de demandes disponibles...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-24 w-full rounded-md" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="w-full max-w-6xl mx-auto">
                <CardHeader>
                    <CardTitle>Erreur</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-destructive">{error}</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-6xl mx-auto">
            <CardHeader>
                <CardTitle>Nouvelle Demande</CardTitle>
                <CardDescription>
                    Sélectionnez le type de demande à créer
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableRequests.map((requestType) => {
                        const details = requestTypeDetails[requestType];
                        if (!details) {
                            console.warn(`Type de demande inconnu: ${requestType}`);
                            return null;
                        }
                        return (
                            <Tooltip key={requestType}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="h-24 w-full flex flex-col items-center justify-center gap-2 p-4 hover:bg-secondary/80 transition-colors"
                                        onClick={() => handleRequestClick(requestType)}
                                    >
                                        <span className="text-lg font-medium">{details.label}</span>
                                        <span className="text-sm text-muted-foreground text-center line-clamp-2">
                                            {details.description}
                                        </span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    <p>Créer une demande: {details.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default NewRequests;