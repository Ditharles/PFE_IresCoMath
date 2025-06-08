import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RequestType } from '../../types/request';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../../components/ui/hover-card';
import { Button } from '../../components/ui/button';
import { Skeleton } from '../../components/ui/skeleton';
import RequestsService from '../../services/requests.service';
import {
    Plane,
    GraduationCap,
    Wrench,
    Presentation,
    Package,
    PackageCheck,
    ScrollText,

} from 'lucide-react';
import { toast } from 'sonner';

const requestTypeDetails = {
    [RequestType.MISSION]: {
        label: 'Mission',
        description: "Déplacement professionnel à l'étranger",
        icon: <Plane className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    [RequestType.INTERNSHIP]: {
        label: 'Stage',
        description: 'Demande de stage académique à l\'étranger',
        icon: <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    [RequestType.CONFERENCE_NATIONAL]: {
        label: 'Conférence nationale',
        description: 'Participation à un événement scientifique sur le territoire tunisien',
        icon: <Presentation className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    [RequestType.EQUIPMENT_PURCHASE]: {
        label: 'Achat matériel',
        description: 'Demande d\'achat de matériel',
        icon: <Package className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    [RequestType.EQUIPMENT_LOAN]: {
        label: 'Prêt matériel',
        description: 'Demande de prêt temporaire de matériel',
        icon: <PackageCheck className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    [RequestType.REPAIR_MAINTENANCE]: {
        label: 'Réparation & Maintenance',
        description: 'Demande de maintenance',
        icon: <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    [RequestType.ARTICLE_REGISTRATION]: {
        label: 'Inscription Article',
        description: 'Frais de publication scientifique',
        icon: <ScrollText className="w-5 h-5 sm:w-6 sm:h-6" />
    },

};

const NewRequests = () => {
    const navigate = useNavigate();
    const requestService = new RequestsService();
    const [availableRequests, setAvailableRequests] = useState([]);
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
                setError(null);
            } catch (err) {
                console.error('Failed to fetch possible requests:', err);
                setError('Une erreur est survenue lors de la chargement des demandes');
                toast.error('Une erreur est survenue lors de la chargement des demandes');
            } finally {
                setLoading(false);
            }
        };

        fetchPossibleRequests();
    }, []);

    const handleRequestClick = (requestType: RequestType) => {
        const routeMap = {
            [RequestType.MISSION]: 'mission',
            [RequestType.INTERNSHIP]: 'stage',
            [RequestType.CONFERENCE_NATIONAL]: 'conference-nationale',
            [RequestType.EQUIPMENT_PURCHASE]: 'achat-materiel',
            [RequestType.EQUIPMENT_LOAN]: 'pret-materiel',
            [RequestType.REPAIR_MAINTENANCE]: 'reparation-maintenance',

            [RequestType.ARTICLE_REGISTRATION]: 'inscription-article'
        };

        navigate(`/nouvelle-demande/${routeMap[requestType]}`);
    };

    if (loading) {
        return (
            <Card className="w-full max-w-6xl mx-auto p-2 sm:p-4">
                <CardHeader className="px-2 py-3 sm:px-4 sm:py-6">
                    <CardTitle className="text-xl sm:text-2xl font-bold">Nouvelle Demande</CardTitle>
                </CardHeader>
                <CardContent className="px-2 sm:px-4">
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                        {[...Array(8)].map((_, i) => (
                            <Skeleton key={i} className="h-24 sm:h-32 rounded-lg" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="w-full max-w-6xl mx-auto p-2 sm:p-4">
                <CardHeader className="px-2 py-3 sm:px-4 sm:py-6">
                    <CardTitle className="text-xl sm:text-2xl font-bold">Erreur</CardTitle>
                </CardHeader>
                <CardContent className="px-2 sm:px-4">
                    <p className="text-destructive">{error}</p>
                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => window.location.reload()}
                    >
                        Réessayer
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-4">
            <Card className="w-full max-w-6xl mx-auto">
                <CardHeader className="px-2 py-3 sm:px-4 sm:py-6">
                    <CardTitle className="text-xl sm:text-2xl font-bold">Nouvelle Demande</CardTitle>
                </CardHeader>
                <CardContent className="px-2 sm:px-4">
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                        {availableRequests.map((requestType) => {
                            const details = requestTypeDetails[requestType as RequestType];
                            if (!details) {
                                console.warn(`Type de demande inconnu: ${requestType}`);
                                return null;
                            }
                            return (
                                <HoverCard key={requestType}>
                                    <HoverCardTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="h-24 sm:h-32 w-full flex flex-col items-center justify-center gap-2 sm:gap-3 p-2 sm:p-4 hover:bg-secondary/80 transition-colors"
                                            onClick={() => handleRequestClick(requestType)}
                                        >
                                            {details.icon}
                                            <span className="text-base sm:text-lg font-semibold text-center line-clamp-2">{details.label}</span>
                                        </Button>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-64 bg-card text-card-foreground">
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-semibold">{details.label}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {details.description}
                                            </p>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default NewRequests;