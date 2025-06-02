import { useState } from "react";
import { toast } from "sonner";
import { MoreHorizontal, Eye, FileText, Trash2, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { Textarea } from "../../ui/textarea";
import { useAuth } from "../../../contexts/AuthContext";
import RequestsService from "../../../services/requests.service";
import { Request, RequestStatus, Role } from "../../../types/request";
import EditRequest from "./request/EditRequest";

interface ActionsCellProps {
    request: Request;
    onRequestUpdate: (updatedRequest: Request) => void;
    onRequestDelete: (deletedRequestId: string) => void;
}

const ActionsCell = ({ request, onRequestUpdate, onRequestDelete }: ActionsCellProps) => {
    const { user } = useAuth();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [openRejectDialog, setOpenRejectDialog] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    if (!user) return null;

    const requestService = new RequestsService();
    const isOwner = user.id === request.user.id;
    const isSupervisor = user.role === Role.ENSEIGNANT && user.id === request.user.supervisorId;
    const isDirector = user.role === Role.DIRECTEUR;

    const canEdit = isOwner && request.status === RequestStatus.PENDING;
    const canDelete = isOwner && request.status === RequestStatus.PENDING;

    let canApprove = false;
    if (isSupervisor) {
        canApprove = [RequestStatus.PENDING, RequestStatus.APPROVED].includes(request.status);
    } else if (isDirector) {
        canApprove = [RequestStatus.PENDING, RequestStatus.APPROVED_BY_SUPERVISOR].includes(request.status);
    }

    const canReject = canApprove;
    const canComplete = isOwner && request.status === RequestStatus.APPROVED;
    const canClose = isOwner && request.status === RequestStatus.COMPLETED;
    let canReignite = false;
    if (isOwner) {
        canReignite = [RequestStatus.PENDING, RequestStatus.COMPLETED].includes(request.status);
    } else if (isDirector) {
        canReignite = [RequestStatus.APPROVED_BY_DIRECTOR, RequestStatus.APPROVED].includes(request.status);
    } const handleDelete = async () => {
        try {
            setIsSubmitting(true);
            const response = await requestService.deleteRequest(request.id);
            toast.success(response?.data?.message || "Demande supprimée avec succès");
            onRequestDelete(request.id);
        } catch (error) {
            console.error("Delete request error:", error);
            toast.error("Une erreur est survenue lors de la suppression");
        } finally {
            setIsSubmitting(false);
            setIsDeleteDialogOpen(false);
        }
    };

    const handleApprove = async () => {
        try {
            setIsSubmitting(true);
            const response = await requestService.approveRequest(request.id);
            toast.success(response.data.message || "Demande approuvée avec succès");

            const updatedRequest = {
                ...request,
                status: isDirector
                    ? RequestStatus.APPROVED
                    : RequestStatus.APPROVED_BY_SUPERVISOR
            };
            onRequestUpdate(updatedRequest);
        } catch (error) {
            toast.error('Erreur lors de l\'approbation de la demande');
            console.error('Error approving request:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReject = async () => {
        if (!rejectReason.trim()) {
            toast.error('Veuillez saisir un motif de rejet');
            return;
        }

        try {
            setIsSubmitting(true);
            await requestService.rejectRequest(request.id, rejectReason);
            toast.success('Demande rejetée avec succès');

            const updatedRequest = {
                ...request,
                status: isDirector
                    ? RequestStatus.REJECTED_BY_DIRECTOR
                    : RequestStatus.REJECTED_BY_SUPERVISOR,
                rejectReason
            };
            onRequestUpdate(updatedRequest);

            setOpenRejectDialog(false);
            setRejectReason('');
        } catch (error) {
            toast.error('Erreur lors du rejet de la demande');
            console.error('Error rejecting request:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleComplete = async () => {
        try {
            setIsSubmitting(true);
            const response = await requestService.completeRequest(request.id);
            toast.success(response.data.message || "Demande terminée avec succès");

            const updatedRequest = {
                ...request,
                status: RequestStatus.COMPLETED
            };
            onRequestUpdate(updatedRequest);
        } catch (error) {
            toast.error('Erreur lors de la terminaison de la demande');
            console.error('Error completing request:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = async () => {
        try {
            setIsSubmitting(true);
            const response = await requestService.closeRequest(request.id);
            toast.success(response.data.message || "Demande clôturée avec succès");

            const updatedRequest = {
                ...request,
                status: RequestStatus.CLOSED
            };
            onRequestUpdate(updatedRequest);
        } catch (error) {
            toast.error('Erreur lors de la clôture de la demande');
            console.error('Error closing request:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReignite = async () => {
        try {
            setIsSubmitting(true);
            const response = await requestService.reigniteRequest(request.id);
            toast.success(response.data.message || "Demande relancée avec succès");

            const updatedRequest = {
                ...request,
                status: RequestStatus.PENDING
            };
            onRequestUpdate(updatedRequest);
        } catch (error) {
            toast.error('Erreur lors de la relance de la demande');
            console.error('Error reigniting request:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleMenuItemClick = (action: string) => {
        setDropdownOpen(false);

        setTimeout(() => {
            if (action === 'edit') {
                setIsEditModalOpen(true);
            } else if (action === 'delete') {
                setIsDeleteDialogOpen(true);
            } else if (action === 'approve') {
                handleApprove();
            } else if (action === 'reject') {
                setOpenRejectDialog(true);
            } else if (action === 'complete') {
                handleComplete();
            } else if (action === 'close') {
                handleClose();
            } else if (action === 'reignite') {
                handleReignite();
            }
        }, 100);
    };

    return (
        <div className="flex items-center gap-2">
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                    >
                        <span className="sr-only">Ouvrir le menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuItem asChild>
                        <a href={`/demande/${request.id}`} className="flex items-center w-full" onClick={() => setDropdownOpen(false)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Voir détails
                        </a>
                    </DropdownMenuItem>

                    {canEdit && (
                        <DropdownMenuItem onClick={() => handleMenuItemClick('edit')}>
                            <FileText className="h-4 w-4 mr-2" />
                            Modifier
                        </DropdownMenuItem>
                    )}

                    {canDelete && (
                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleMenuItemClick('delete')}
                            disabled={isSubmitting}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                        </DropdownMenuItem>
                    )}

                    {canApprove && (
                        <DropdownMenuItem
                            onClick={() => handleMenuItemClick('approve')}
                            disabled={isSubmitting}
                            className="text-green-600"
                        >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {isDirector ? 'Valider définitivement' : 'Approuver'}
                        </DropdownMenuItem>
                    )}

                    {canReject && (
                        <DropdownMenuItem
                            onClick={() => handleMenuItemClick('reject')}
                            disabled={isSubmitting}
                            className="text-red-600"
                        >
                            <XCircle className="h-4 w-4 mr-2" />
                            Rejeter
                        </DropdownMenuItem>
                    )}

                    {canComplete && (
                        <DropdownMenuItem
                            onClick={() => handleMenuItemClick('complete')}
                            disabled={isSubmitting}
                            className="text-green-600"
                        >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Terminer
                        </DropdownMenuItem>
                    )}

                    {canClose && (
                        <DropdownMenuItem
                            onClick={() => handleMenuItemClick('close')}
                            disabled={isSubmitting}
                            className="text-green-600"
                        >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Clôturer
                        </DropdownMenuItem>
                    )}

                    {canReignite && (
                        <DropdownMenuItem
                            onClick={() => handleMenuItemClick('reignite')}
                            disabled={isSubmitting}
                            className="text-green-600"
                        >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Relancer
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirmer la suppression</DialogTitle>
                        <DialogDescription>
                            Êtes-vous sûr de vouloir supprimer cette demande ? Cette action est irréversible.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-2 mt-4">
                        <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)}>
                            Annuler
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Suppression...' : 'Confirmer la suppression'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Reject Dialog */}

            {canReject && (
                <Dialog open={openRejectDialog} onOpenChange={setOpenRejectDialog}>
                    <DialogContent className="bg-background p-6 rounded-lg max-w-md w-full m-auto">
                        <DialogHeader>
                            <DialogTitle>Motif de rejet</DialogTitle>
                            <DialogDescription>
                                Veuillez indiquer la raison du rejet de cette demande.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <Textarea
                                id="reason"
                                placeholder="Motif de rejet..."
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                className="min-h-[120px]"
                            />
                        </div>

                        <DialogFooter className="sticky">
                            <Button variant="outline" onClick={() => setOpenRejectDialog(false)}>
                                Annuler
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleReject}
                                disabled={isSubmitting || !rejectReason.trim()}
                            >
                                Confirmer le rejet
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && request && (
                <EditRequest
                    request={request}
                    onClose={() => setIsEditModalOpen(false)}
                    onSuccess={onRequestUpdate}
                    isOpen={isEditModalOpen}
                />
            )}
        </div>
    );
};

export default ActionsCell;