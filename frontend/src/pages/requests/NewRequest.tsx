/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Send, Info } from 'lucide-react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';



import { z } from 'zod';
import { toast } from 'sonner';
import ArticleRegistrationForm from '../../components/form/requests/ArticleRegistrationForm';
import EquipmentLoanForm from '../../components/form/requests/EquipementLoanForm';
import EquipmentPurchaseForm from '../../components/form/requests/EquipementPurchaseForm';
import InternshipForm from '../../components/form/requests/InternshipForm';
import MissionForm from '../../components/form/requests/MissionForm';
import ScientificEventForm from '../../components/form/requests/ScientificEvent.Form';
import LoadingOverlay from '../../components/LoadingOverlay';
import { Alert, AlertTitle, AlertDescription } from '../../components/ui/alert';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/card';
import { internshipRequestSchema, missionRequestSchema, scientificEventRequestSchema, articleRegistrationRequestSchema, equipmentLoanRequestSchema, equipmentPurchaseRequestSchema } from '../../schemas/requestSchema';
import RequestsService from '../../services/requests.service';
import { RequestType } from '../../types/request';

const NewRequest: React.FC = () => {




  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const requestService = new RequestsService();

  const mapTypeToRequest = (): RequestType => {
    switch (type) {
      case 'stage': return RequestType.INTERNSHIP;
      case 'mission': return RequestType.MISSION;
      case 'conference-nationale': return RequestType.CONFERENCE_NATIONAL;
      case 'inscription-article': return RequestType.ARTICLE_REGISTRATION;
      case 'pret-materiel': return RequestType.EQUIPMENT_LOAN;
      case 'achat-materiel': return RequestType.EQUIPMENT_PURCHASE;
      case 'reparation-maintenance': return RequestType.REPAIR_MAINTENANCE;
      default: return RequestType.MISSION;
    }
  };

  const mapTypeToSchema = () => {
    switch (type) {
      case 'stage': return internshipRequestSchema;
      case 'mission': return missionRequestSchema;
      case 'conference-nationale': return scientificEventRequestSchema;
      case 'inscription-article': return articleRegistrationRequestSchema;
      case 'pret-materiel': return equipmentLoanRequestSchema;
      case 'achat-materiel': return equipmentPurchaseRequestSchema;
      default: return z.object({});
    }
  };


  const methods = useForm({
    resolver: zodResolver(mapTypeToSchema()),

    mode: 'onBlur',
    defaultValues: {}
  });

  const { handleSubmit, reset, formState: { errors, isValid } } = methods;

  useEffect(() => {
    reset();
    setSubmitError(null);
  }, [type, reset]);

  const handleFormSubmit = async (formData: any) => {
    console.log(isValid)
    if (!isValid) {
      toast.error('Veuillez remplir correctement tous les champs requis');

      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await requestService.createRequest(formData, mapTypeToRequest());
      toast.success(response.data.message || "Demande créée avec succès");
      setTimeout(() => {
        navigate("/accueil");
      }, 2000);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message ||
        error.message ||
        "Une erreur inattendue est survenue";
      setSubmitError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFormTitle = () => {
    switch (type) {
      case 'stage': return 'Demande de Stage';
      case 'mission': return 'Demande de Mission';
      case 'conference-nationale': return 'Conférence Nationale';
      case 'inscription-article': return 'Inscription d\'Article';
      case 'pret-materiel': return 'Prêt de Matériel';
      case 'achat-materiel': return 'Achat de Matériel';
      case 'reparation-maintenance': return 'Réparation/Maintenance';
      case 'contractuel': return 'Demande Contractuelle';
      default: return 'Nouvelle Demande';
    }
  };

  const renderCorrespondingForm = () => {
    switch (type) {
      case 'stage': return <InternshipForm />;
      case 'mission': return <MissionForm />;
      case 'conference-nationale': return <ScientificEventForm />;
      case 'inscription-article': return <ArticleRegistrationForm />;
      case 'pret-materiel': return <EquipmentLoanForm />;
      case 'achat-materiel': return <EquipmentPurchaseForm />;
      default: return (
        <Alert variant="destructive" className="flex items-start space-x-2">
          <Info className="h-4 w-4" />
          <AlertTitle>Attention</AlertTitle>
          <AlertDescription>
            Formulaire non défini pour le type : {type}
          </AlertDescription>
        </Alert>
      );
    }
  };

  return (
    <div className="animate-fadeIn h-full relative bg-background text-foreground">
      {isSubmitting && <LoadingOverlay />}

      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/nouvelle-demande')}
          className="text-primary hover:text-primary/80"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Retour à la liste
        </Button>
      </div>

      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-2xl">
            {getFormTitle()}
          </CardTitle>
        </CardHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <CardContent className="space-y-4 animate-slideIn">
              {renderCorrespondingForm()}
            </CardContent>

            <CardFooter className="flex justify-end gap-3 mt-8 bg-muted">
              <Button
                type="reset"
                variant="outline"
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <LoadingOverlay loadingText="Envoi en cours..." />
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Soumettre
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};

export default NewRequest;

