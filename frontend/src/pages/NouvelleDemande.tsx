// src/pages/NouvelleDemande.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RequestsService from '../services/requests.service';
import { Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';

export enum RequestType {
    MISSION = 'MISSION',
    STAGE = 'STAGE',
    CONFERENCE = 'CONFERENCE',
    ACHAT_MATERIEL = 'ACHAT_MATERIEL',
    PRET_MATERIEL = 'PRET_MATERIEL',
    DEPLACEMENT_HEBERGEMENT = 'DEPLACEMENT_HEBERGEMENT',
    REPARATION_MAINTENANCE = 'REPARATION_MAINTENANCE',
    CONTRACTUEL = 'CONTRACTUEL',
    INSCRIPTION_ARTICLE = 'INSCRIPTION_ARTICLE'
  }
// Mapping pour les libellés et descriptions des requêtes
const requestTypeDetails: Record<RequestType, { label: string; description: string }> = {
  [RequestType.MISSION]: { label: 'Mission', description: "Déplacement professionnel à l'étranger" },
  [RequestType.CONFERENCE]: { label: 'Conférence', description: 'Participation à un événement scientifique' },
  [RequestType.ACHAT_MATERIEL]: { label: 'Achat matériel', description: 'Demande d\'achat de matériel' },
  [RequestType.PRET_MATERIEL]: { label: 'Prêt matériel', description: 'Demande de prêt temporaire de matériel' },
  [RequestType.DEPLACEMENT_HEBERGEMENT]: { label: 'Déplacement & Hébergement', description: 'Frais de déplacement' },
  [RequestType.REPARATION_MAINTENANCE]: { label: 'Réparation & Maintenance', description: 'Demande de maintenance' },
  [RequestType.CONTRACTUEL]: { label: 'Contractuel', description: 'Engagement d\'un personnel contractuel' },
  [RequestType.INSCRIPTION_ARTICLE]: { label: 'Inscription Article', description: 'Frais de publication scientifique' },
  [RequestType.STAGE]: { label: 'Stage', description: 'Demande de stage académique à l\'étranger' },
};

const NouvelleDemande = () => {
  const navigate = useNavigate();
const requestService= new RequestsService()
  const [availableRequests, setAvailableRequests] = useState<RequestType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPossibleRequests = async () => {
      try {
        setLoading(true);
       const requests=requestService.getPossibleRequests()
       setAvailableRequests(requests)
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
    navigate(`/nouvelle-demande/${requestType.toLowerCase()}`);
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

export default NouvelleDemande;