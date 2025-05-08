import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Send, Info } from 'lucide-react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import ArticleRegistrationForm from '../components/form/requests/ArticleRegistrationForm';

import LoadingOverlay from '../components/LoadingOverlay';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Toast, toast } from '../components/Toast';
// Schémas de validation Zod
import {
  internshipRequestSchema,
  missionRequestSchema,
  scientificEventRequestSchema,
  articleRegistrationRequestSchema,
  equipmentLoanRequestSchema,
  equipmentPurchaseRequestSchema
} from '../schemas/requestSchema';
import { RequestType } from '../types/request';

import RequestsService from '../services/requests.service';
import InternshipForm from '../components/form/requests/InternshipForm';
import MissionForm from '../components/form/requests/MissionForm';
import ScientificEventForm from '../components/form/requests/ScientificEvent.Form';

import { z } from 'zod';
import EquipmentLoanForm from '../components/form/requests/EquipementLoanForm';
import EquipmentPurchaseForm from '../components/form/requests/EquipementPurchaseForm';

const NewRequest: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const requestService = new RequestsService();


  // Conversion des types français vers les types du schéma Prisma
  const getTypeRequest = () => {
    switch (type) {
      case 'stage': return RequestType.INTERNSHIP;
      case 'mission': return RequestType.MISSION;
      case 'conference': return RequestType.CONFERENCE;
      case 'inscription-article': return RequestType.ARTICLE_REGISTRATION;
      case 'pret-materiel': return RequestType.EQUIPMENT_LOAN;
      case 'achat-materiel': return RequestType.EQUIPMENT_PURCHASE;
      case 'reparation-maintenance': return RequestType.REPAIR_MAINTENANCE;
      case 'voyage-hebergement': return RequestType.TRAVEL_ACCOMMODATION;
      case 'contractuel': return RequestType.CONTRACTUAL;
      default: return RequestType.CONTRACTUAL;
    }
  };

  const getValidationSchema = () => {
    switch (type) {
      case 'stage': return internshipRequestSchema;
      case 'mission': return missionRequestSchema;
      case 'conference': return scientificEventRequestSchema;
      case 'inscription-article': return articleRegistrationRequestSchema;
      case 'pret-materiel': return equipmentLoanRequestSchema;
      case 'achat-materiel': return equipmentPurchaseRequestSchema;
      default: return z.object({});
    }
  };

  const methods = useForm({
    resolver: zodResolver(getValidationSchema()),
    mode: 'onBlur',
    defaultValues: {}
  });

  const { handleSubmit, reset, formState: { errors, isValid } } = methods;
  console.log(errors)
  useEffect(() => {
    reset();
    setSubmitError(null); // Réinitialise les erreurs à chaque changement de type
  }, [type, reset]);

  const onSubmit = async (data: any) => {
    if (!isValid) {
      toast.error('Veuillez remplir correctement tous les champs requis');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await requestService.createRequest(data, getTypeRequest());
      console.log(response)

      toast.success(response.data.message || "Demande créée avec succès");
      setTimeout(() => {
        navigate("/accueil");
      }, 2000);

    } catch (error: unknown) {
      const errorMessage = error?.response?.data?.message ||
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
      case 'conference': return 'Conférence Scientifique';
      case 'inscription-article': return 'Inscription d\'Article';
      case 'pret-materiel': return 'Prêt de Matériel';
      case 'achat-materiel': return 'Achat de Matériel';
      case 'reparation-maintenance': return 'Réparation/Maintenance';
      case 'voyage-hebergement': return 'Voyage/Hébergement';
      case 'contractuel': return 'Demande Contractuelle';
      default: return 'Nouvelle Demande';
    }
  };

  const renderForm = () => {
    switch (type) {
      case 'stage': return <InternshipForm />;
      case 'mission': return <MissionForm />;
      case 'conference': return <ScientificEventForm />;
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
    <div className="animate-fadeIn h-full relative">
      {isSubmitting && <LoadingOverlay />}
      <Toast />
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

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {getFormTitle()}
          </CardTitle>
        </CardHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4 animate-slideIn">
              {renderForm()}
            </CardContent>

            <CardFooter className="flex justify-end gap-3 mt-8">
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