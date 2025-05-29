/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogDescription } from '../../../ui/dialog';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../contexts/AuthContext';
import RequestsService from '../../../../services/requests.service';
import { RequestStatus } from '../../../../types/MemberAddRequest';
import { Role } from '../../../../types/request';
import { Button } from '../../../ui/button';
import { DialogHeader, DialogFooter } from '../../../ui/dialog';
import { Textarea } from '../../../ui/textarea';
import EditRequest from './EditRequest';


interface RequestActionsProps {

    requestData: any;
    onActionComplete: () => void;
}

const RequestActions: React.FC<RequestActionsProps> = ({ requestData, onActionComplete }) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const { user } = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [openRejectDialog, setOpenRejectDialog] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!user) return null;

    const requestsService = new RequestsService();
    const isOwner = user.id === requestData.user.id;
    const isSupervisor = user.role === Role.ENSEIGNANT && user.id === requestData.user.supervisorId;
    const isDirector = user.role === Role.DIRECTEUR;

    const canEdit = isOwner;
    let canApprove = false;
    if (isSupervisor) {
        canApprove = requestData.request.status === RequestStatus.PENDING || requestData.request.status === RequestStatus.APPROVED;
    } else if (isDirector) {
        canApprove = requestData.request.status === RequestStatus.PENDING || requestData.request.status === RequestStatus.APPROVED_BY_SUPERVISOR;
    }

    const canDelete = isOwner && requestData.request.status === RequestStatus.PENDING;

    const canReject = canApprove;


    const handleDelete = async () => {
        try {
            setIsSubmitting(true);
            const message = (await requestsService.deleteRequest(requestData.request.id)).data;
            toast.success(message);
            onActionComplete?.();
        } catch (error) {
            toast.error('Une erreur est survenue lors de la suppression');
            console.error('Error deleting request:', error);
        } finally {
            setIsSubmitting(false);
            setIsDeleteDialogOpen(false);
        }
    };

    const handleApprove = async () => {
        try {
            setIsSubmitting(true);
            const response = await requestsService.approveRequest(requestData.request.id);
            toast.success(response.data.message);
            onActionComplete?.();
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
            await requestsService.rejectRequest(requestData.request.id, rejectReason);
            toast.success('Demande rejetée');
            setOpenRejectDialog(false);
            setRejectReason('');
            onActionComplete?.();
        } catch (error) {
            toast.error('Erreur lors du rejet de la demande');
            console.error('Error rejecting request:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex gap-2">
            {canEdit && (
                <Button
                    variant="outline"
                    onClick={() => setIsEditModalOpen(true)}
                    disabled={isSubmitting}
                >
                    Modifier
                </Button>
            )}

            {canDelete && (
                <>
                    <Button
                        variant="destructive"
                        onClick={() => setIsDeleteDialogOpen(true)}
                        disabled={isSubmitting}
                    >
                        Supprimer
                    </Button>
                    <Dialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setIsDeleteDialogOpen}

                    >
                        <DialogContent className="bg-background p-6 rounded-lg max-w-md w-full m-auto" >
                            <DialogHeader>
                                <DialogTitle>Confirmer la suppression</DialogTitle>
                            </DialogHeader>
                            <p className="text-sm text-muted-foreground">
                                Êtes-vous sûr de vouloir supprimer cette demande ? Cette action est irréversible.
                            </p>
                            <DialogFooter className="flex justify-end gap-2 mt-4">
                                <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)}>
                                    Annuler
                                </Button>
                                <Button variant="destructive" onClick={handleDelete}>
                                    Confirmer la suppression
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </>
            )}

            {canApprove && (
                <Button
                    onClick={handleApprove}
                    disabled={isSubmitting}
                >
                    {isDirector ? 'Valider définitivement' : 'Approuver'}
                </Button>
            )}

            {canReject && (
                <Dialog
                    open={openRejectDialog}
                    onOpenChange={setOpenRejectDialog}

                >
                    <DialogTrigger asChild>
                        <Button variant="destructive" disabled={isSubmitting}>
                            Rejeter
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-background p-6 rounded-lg max-w-md w-full m-auto" >
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
                                className="min-h-[120px] bg-background text-foreground border-border"
                            />
                        </div>

                        <DialogFooter>
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

