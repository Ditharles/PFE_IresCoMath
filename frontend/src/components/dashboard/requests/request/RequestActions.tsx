
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../../../contexts/AuthContext";
import RequestsService from "../../../../services/requests.service";
import { RequestStatus } from "../../../../types/MemberAddRequest";
import { Role } from "../../../../types/request";
import { Button } from "../../../ui/button";
import { Textarea } from "../../../ui/textarea";
import EditRequest from "./EditRequest";

import {
    Pencil,
    Trash,
    CheckCircle2,
    XCircle,
    RotateCcw,
    ClipboardCheck,
    Lock,
} from "lucide-react";

interface RequestActionsProps {
    requestData: any;
    onActionComplete: () => void;
}

const RequestActions: React.FC<RequestActionsProps> = ({ requestData, onActionComplete }) => {
    const { user } = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [openRejectDialog, setOpenRejectDialog] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!user) return null;

    const requestsService = new RequestsService();
    const isOwner = user.id === requestData.user.id;
    const isSupervisor = user.role === Role.ENSEIGNANT && user.id === requestData.user.supervisorId;
    const isDirector = user.role === Role.DIRECTEUR;

    const canEdit = isOwner && requestData.request.status === RequestStatus.PENDING;
    const canDelete = isOwner && requestData.request.status === RequestStatus.PENDING;

    let canApprove = false;
    if (isSupervisor) {
        canApprove = [RequestStatus.PENDING, RequestStatus.APPROVED].includes(requestData.request.status);
    } else if (isDirector) {
        canApprove = [RequestStatus.PENDING, RequestStatus.APPROVED_BY_SUPERVISOR].includes(requestData.request.status);
    }

    const canReject = canApprove;
    const canComplete = isOwner && requestData.request.status === RequestStatus.APPROVED;
    const canClose = isOwner && requestData.request.status === RequestStatus.COMPLETED;

    let canReignite = false;
    if (isOwner) {
        canReignite = [RequestStatus.PENDING, RequestStatus.COMPLETED].includes(requestData.request.status);
    } else if (isDirector) {
        canReignite = [RequestStatus.APPROVED_BY_DIRECTOR, RequestStatus.APPROVED].includes(requestData.request.status);
    }

    const handleAction = async (action: () => Promise<any>, successMsg: string, errorMsg: string) => {
        try {
            setIsSubmitting(true);
            const response = await action();
            toast.success(response?.data?.message || successMsg);
            onActionComplete?.();
        } catch (error) {
            toast.error(errorMsg);
            console.error(errorMsg, error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const buttonBaseClasses = "transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md cursor-pointer";

    return (
        <div className="flex flex-wrap gap-2">
            {canEdit && (
                <Button
                    variant="outline"
                    onClick={() => setIsEditModalOpen(true)}
                    disabled={isSubmitting}
                    className={`${buttonBaseClasses} hover:bg-accent`}
                >
                    <Pencil className="w-4 h-4 mr-2" />
                    Modifier
                </Button>
            )}

            {canDelete && (
                <>
                    <Button
                        variant="destructive"
                        onClick={() => setIsDeleteDialogOpen(true)}
                        disabled={isSubmitting}
                        className={`${buttonBaseClasses} hover:bg-destructive/90`}
                    >
                        <Trash className="w-4 h-4 mr-2" />
                        Supprimer
                    </Button>
                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <DialogContent className="bg-background p-6 rounded-lg max-w-md w-full">
                            <DialogHeader>
                                <DialogTitle>Confirmer la suppression</DialogTitle>
                                <DialogDescription>
                                    Êtes-vous sûr de vouloir supprimer cette demande ? Cette action est irréversible.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="mt-4 flex justify-end gap-2">
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsDeleteDialogOpen(false)}
                                    className={`${buttonBaseClasses} hover:bg-accent`}
                                >
                                    Annuler
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => handleAction(() => requestsService.deleteRequest(requestData.request.id), "Demande supprimée avec succès", "Erreur de suppression")}
                                    disabled={isSubmitting}
                                    className={`${buttonBaseClasses} hover:bg-destructive/90`}
                                >
                                    {isSubmitting ? "Suppression..." : "Confirmer la suppression"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </>
            )}

            {canApprove && (
                <Button
                    onClick={() => handleAction(() => requestsService.approveRequest(requestData.request.id), "Demande approuvée", "Erreur lors de l'approbation")}
                    disabled={isSubmitting}
                    className={`${buttonBaseClasses} hover:bg-primary/90`}
                >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {isDirector ? "Valider définitivement" : "Approuver"}
                </Button>
            )}

            {canReject && (
                <Dialog open={openRejectDialog} onOpenChange={setOpenRejectDialog}>
                    <DialogTrigger asChild>
                        <Button
                            variant="destructive"
                            disabled={isSubmitting}
                            className={`${buttonBaseClasses} hover:bg-destructive/90`}
                        >
                            <XCircle className="w-4 h-4 mr-2" />
                            Rejeter
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-background p-6 rounded-lg max-w-md w-full">
                        <DialogHeader>
                            <DialogTitle>Motif de rejet</DialogTitle>
                            <DialogDescription>
                                Veuillez indiquer la raison du rejet de cette demande.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Textarea
                                placeholder="Motif de rejet..."
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                className="min-h-[120px]"
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setOpenRejectDialog(false)}
                                className={`${buttonBaseClasses} hover:bg-accent`}
                            >
                                Annuler
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => handleAction(
                                    () => requestsService.rejectRequest(requestData.request.id, rejectReason),
                                    "Demande rejetée",
                                    "Erreur lors du rejet de la demande"
                                )}
                                disabled={isSubmitting || !rejectReason.trim()}
                                className={`${buttonBaseClasses} hover:bg-destructive/90`}
                            >
                                Confirmer le rejet
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {canComplete && (
                <Button
                    onClick={() => handleAction(() => requestsService.completeRequest(requestData.request.id), "Demande terminée", "Erreur lors de la terminaison")}
                    disabled={isSubmitting}
                    className={`${buttonBaseClasses} hover:bg-primary/90`}
                >
                    <ClipboardCheck className="w-4 h-4 mr-2" />
                    Terminer
                </Button>
            )}

            {canClose && (
                <Button
                    onClick={() => handleAction(() => requestsService.closeRequest(requestData.request.id), "Demande clôturée", "Erreur lors de la clôture")}
                    disabled={isSubmitting}
                    className={`${buttonBaseClasses} hover:bg-accent`}
                >
                    <Lock className="w-4 h-4 mr-2" />
                    Clôturer
                </Button>
            )}

            {canReignite && (
                <Button
                    onClick={() => handleAction(() => requestsService.reigniteRequest(requestData.request.id), "Demande relancée", "Erreur lors de la relance")}
                    disabled={isSubmitting}
                    className={`${buttonBaseClasses} hover:bg-primary/90`}
                >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Relancer
                </Button>
            )}

            {isEditModalOpen && requestData.request && (
                <EditRequest
                    request={requestData.request}
                    onClose={() => setIsEditModalOpen(false)}
                    onSuccess={onActionComplete}
                    isOpen={isEditModalOpen}
                />
            )}
        </div>
    );
};

export default RequestActions;
