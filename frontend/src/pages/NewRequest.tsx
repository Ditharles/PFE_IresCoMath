import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


import { ChevronLeft, Send, Info } from 'lucide-react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Composants de formulaire
import ArticleRegistrationForm from '../components/form/requests/ArticleRegistrationForm';
import EquipmentLoanForm from '../components/form/requests/EquipementLoanForm';
import MissionForm from '../components/form/requests/MissionForm';
import ScientificEventForm from '../components/form/requests/ScientificEvent.Form';
import StageForm from '../components/form/requests/StageForm';
import LoadingOverlay from '../components/LoadingOverlay';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Toast, toast } from '../components/Toast';
// Schémas de validation Zod
import {
  stageSchema,
  missionSchema,
  scientificEventSchema,
  articleRegistrationSchema,
  equipmentLoanSchema,
  equipmentPurchaseSchema
} from '../schemas/requestSchema';
import { RequestType } from '../types/request';
import EquipmentPurchaseForm from '../components/form/requests/EquipementPurchaseForm';
import RequestsService from '../services/requests.service';



const NewRequest: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const requestService = new RequestsService();
  const getTypeRequest = () => {
    switch (type) {
      case 'stage': return RequestType.STAGE;
      case 'mission': return RequestType.MISSION;
      case 'evenement_scientifique': return RequestType.CONFERENCE;
      case 'inscription_article': return RequestType.INSCRIPTION_ARTICLE;
      case 'pret_materiel': return RequestType.PRET_MATERIEL;
      case 'achat_materiel': return RequestType.ACHAT_MATERIEL;
      default: return RequestType.CONTRACTUEL;
    }
  };
  const getValidationSchema = () => {
    switch (type) {
      case 'stage': return stageSchema;
      case 'mission': return missionSchema;
      case 'evenement_scientifique': return scientificEventSchema;
      case 'inscription_article': return articleRegistrationSchema;
      case 'pret_materiel': return equipmentLoanSchema;
      case 'achat_materiel': return equipmentPurchaseSchema;
      default: return z.object({});
    }
  };

  const methods = useForm<any>({
    resolver: zodResolver(getValidationSchema()),
    mode: 'onBlur',
    defaultValues: {}
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset();
  }, [type, reset]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await requestService.createRequest(data, getTypeRequest());
      toast.success(response?.data?.message);
      setTimeout(() => {
        navigate("/accueil");
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);

    }
  };

  const getFormTitle = () => {
    switch (type) {
      case 'stage': return 'Demande de Stage';
      case 'mission': return 'Demande de Mission';
      case 'evenement_scientifique': return 'Événement Scientifique';
      case 'inscription_article': return 'Inscription d\'Article';
      case 'pret_materiel': return 'Prêt de Matériel';
      case 'achat_materiel': return 'Achat de Matériel';

      default: return 'Nouvelle Demande';
    }
  };

  const renderForm = () => {
    switch (type) {
      case 'stage': return <StageForm />;
      case 'mission': return <MissionForm />;
      case 'evenement_scientifique': return <ScientificEventForm />;
      case 'inscription_article': return <ArticleRegistrationForm />;
      case 'pret_materiel': return <EquipmentLoanForm />;
      case 'achat_materiel': return <EquipmentPurchaseForm />;
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
          onClick={() => navigate('/')}
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
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
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
