import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import RequestsService from "../../../../services/requests.service";
import { RequestType, Request } from "../../../../types/request";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "../../../ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "../../../ui/alert";
import { Button } from "../../../ui/button";
import { FORM_COMPONENTS, SCHEMA_MAP } from "../../../../constants/requests";
import { Loader2 } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { Info } from "lucide-react";

interface EditRequestProps {
  request: Request;
  onClose: () => void;
  onSuccess: (request: Request) => void;
  isOpen: boolean;
}

const formatDateForInput = (date?: Date | string): Date => {
  if (!date) return new Date();
  const d = new Date(date);
  return d;
};

const getDefaultValues = (request: Request) => {
  const { type, id } = request;

  const defaults = {
    [RequestType.INTERNSHIP]: {
      id,
      organization: request.stage?.organization || "",
      organizationEmail: request.stage?.organizationEmail || "",
      organizationUrl: request.stage?.organizationUrl || "",
      supervisor: request.stage?.supervisor || "",
      supervisorEmail: request.stage?.supervisorEmail || "",
      supervisorPhone: request.stage?.supervisorPhone || "",
      letter: request.stage?.letter || "",
      country: request.stage?.country || "",
      startDate: formatDateForInput(request.stage?.startDate),
      endDate: formatDateForInput(request.stage?.endDate),
    },
    [RequestType.CONFERENCE_NATIONAL]: {
      id,
      location: request.scientificEvent?.location || "",
      urlEvent: request.scientificEvent?.urlEvent || "",
      mailAcceptation: request.scientificEvent?.mailAcceptation || "",
      title: request.scientificEvent?.title || "",
      articlesAccepted: request.scientificEvent?.articlesAccepted || false,
      articleCover: request.scientificEvent?.articleCover || "",
      startDate: formatDateForInput(request.scientificEvent?.startDate),
      endDate: formatDateForInput(request.scientificEvent?.endDate),
    },
    [RequestType.ARTICLE_REGISTRATION]: {
      id,
      title: request.articleRegistration?.title || "",
      conference: request.articleRegistration?.conference || "",
      urlConference: request.articleRegistration?.urlConference || "",
      articleCover: request.articleRegistration?.articleCover || "",
      amount: request.articleRegistration?.amount || "",
    },
    [RequestType.EQUIPMENT_LOAN]: {
      id,
      equipment: request.equipmentLoanRequest?.equipment || null,
      category: request.equipmentLoanRequest?.category || null,
      quantity: request.equipmentLoanRequest?.quantity || 1,
      startDate: formatDateForInput(request.equipmentLoanRequest?.startDate),
      endDate: formatDateForInput(request.equipmentLoanRequest?.endDate),
    },
    [RequestType.EQUIPMENT_PURCHASE]: {
      id,
      equipmentType: request.purchaseRequest?.equipmentType || "",
      name: request.purchaseRequest?.name || "",
      quantity: request.purchaseRequest?.quantity || 1,
      url: request.purchaseRequest?.url || "",
      photo: request.purchaseRequest?.photo || "",
      specifications: request.purchaseRequest?.specifications || {},
      costEstimation: request.purchaseRequest?.costEstimation || 0,
    },
    [RequestType.MISSION]: {
      id,
      hostOrganization: request.mission?.hostOrganization || "",
      objective: request.mission?.objective || "",
      country: request.mission?.country || "",
      startDate: formatDateForInput(request.mission?.startDate),
      endDate: formatDateForInput(request.mission?.endDate),
      specificDocument: request.mission?.specificDocument || [],
      document: request.mission?.document || [],
    },
    [RequestType.REPAIR_MAINTENANCE]: {
      id,
      equipmentType: request.purchaseRequest?.equipmentType || "",
      name: request.purchaseRequest?.name || "",
      quantity: request.purchaseRequest?.quantity || 1,
      url: request.purchaseRequest?.url || "",
      photo: request.purchaseRequest?.photo || "",
      specifications: request.purchaseRequest?.specifications || {},
      costEstimation: request.purchaseRequest?.costEstimation || 0,
    }
  };

  return defaults[type] || {};
};

const EditRequest = ({ request, onClose, onSuccess, isOpen }: EditRequestProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const requestService = new RequestsService();
  const { type } = request;
  const schema = SCHEMA_MAP[type] || z.object({});
  const defaultValues = getDefaultValues(request);
  const FormComponent = FORM_COMPONENTS[type];

  const methods = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues,
  });

  const { handleSubmit, reset, formState: { isValid, isDirty } } = methods;

  useEffect(() => {
    if (isOpen) {
      reset(getDefaultValues(request));
    }
  }, [isOpen, request, reset]);

  const handleFormSubmit = async (formData: any) => {
    if (!isValid) {
      toast.error("Veuillez remplir correctement tous les champs requis");
      return;
    }

    setIsSubmitting(true);

    try {
      const dataToSend = {
        ...formData,
        type,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
      };

      const response = await requestService.editRequest(request.id, dataToSend);
      toast.success(response.data.message || "Demande modifiée avec succès");
      onSuccess(response.data.data);
      setTimeout(() => {
        onClose();
      }, 1000);

    } catch (error: any) {
      const errorMessage = error.response?.data?.message ||
        error.message ||
        "Une erreur inattendue est survenue";

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAttempt = () => {
    if (isDirty) {
      setShowConfirmDialog(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    reset();
    setShowConfirmDialog(false);
    onClose();
  };

  return (
    <>
      {/* Dialog principal d'édition */}
      <Dialog open={isOpen} onOpenChange={handleCloseAttempt}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle>Modifier la demande</DialogTitle>
                <DialogDescription>
                  Modifier les détails de la demande {request.id}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
              {FormComponent ? (
                <FormComponent />
              ) : (
                <Alert variant="destructive" className="flex items-start space-x-2">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Attention</AlertTitle>
                  <AlertDescription>
                    Formulaire non défini pour le type : {type}
                  </AlertDescription>
                </Alert>
              )}

              <DialogFooter className="gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseAttempt}
                  disabled={isSubmitting}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !isDirty}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin h-4 w-4" />
                      Enregistrement...
                    </span>
                  ) : (
                    "Enregistrer les modifications"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmation pour les modifications non enregistrées */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Modifications non enregistrées
            </DialogTitle>
            <DialogDescription className="mt-2">
              Des modifications ont été effectuées mais n'ont pas été
              enregistrées. Si vous quittez maintenant, ces modifications seront
              perdues.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 mt-6">
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

export default EditRequest;