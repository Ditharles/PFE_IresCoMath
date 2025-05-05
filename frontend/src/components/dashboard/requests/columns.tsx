/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { RequestInfo, RequestType, RequestStatus } from "../../../../types/Request";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../../../ui/dropdown-menu";
import { Button } from "../../../ui/button";
import { MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../ui/dialog";
import { Textarea } from "../../../ui/textarea";
import { RequestService } from "../../../../services/request.service";
import { toast } from "../../../Toast";
import { Badge } from "../../../ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const requestService = new RequestService();

const updateRequestStatus = async (id: string, status: RequestStatus, notes?: string) => {
    try {
        const response = await requestService.updateRequestStatus(id, status, notes);
        toast.success("Statut de la demande mis à jour avec succès");
        return true;
    } catch (error) {
        console.error(error);
        toast.error("Une erreur est survenue lors de la mise à jour");
        return false;
    }
};

export const columns: ColumnDef<RequestInfo>[] = [
    {
        accessorKey: "id",
        header: "Référence",
        enableColumnFilter: true,
        cell: ({ row }) => <div className="font-mono text-xs">{row.getValue("id").substring(0, 8)}</div>,
    },
    {
        accessorKey: "type",
        header: "Type",
        enableColumnFilter: true,
        cell: ({ row }) => {
            const type = row.getValue("type") as RequestType;
            return (
                <Badge variant={type === RequestType.PURCHASE ? "default" : "secondary"}>
                    {type === RequestType.PURCHASE ? "Achat" : "Prêt"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "user.name",
        header: "Demandeur",
        enableColumnFilter: true,
        cell: ({ row }) => {
            const original = row.original;
            return <div>{original.user?.name || "Inconnu"}</div>;
        },
    },
    {
        accessorKey: "creeLe",
        header: "Date de création",
        enableColumnFilter: true,
        cell: ({ row }) => {
            const date = row.getValue("creeLe") as Date;
            return <div>{format(new Date(date), "dd MMM yyyy", { locale: fr })}</div>;
        },
    },
    {
        accessorKey: "statut",
        header: "Statut",
        enableColumnFilter: true,
        cell: ({ row }) => {
            const statut = row.getValue("statut") as RequestStatus;
            const getStatusBadge = () => {
                switch (statut) {
                    case RequestStatus.PENDING:
                        return <Badge variant="outline">En attente</Badge>;
                    case RequestStatus.APPROVED:
                        return <Badge variant="success">Approuvée</Badge>;
                    case RequestStatus.REJECTED:
                        return <Badge variant="destructive">Rejetée</Badge>;
                    case RequestStatus.COMPLETED:
                        return <Badge variant="default">Terminée</Badge>;
                    default:
                        return <Badge variant="outline">Inconnu</Badge>;
                }
            };
            
            return getStatusBadge();
        },
    },
    {
        id: "details",
        header: "Détails",
        enableColumnFilter: false,
        cell: ({ row }) => {
            const original = row.original;
            
            if (original.type === RequestType.PURCHASE) {
                return (
                    <div className="text-sm">
                        <div><span className="font-medium">{original.detailsAchat?.nom}</span></div>
                        <div className="text-muted-foreground">{original.detailsAchat?.typeMateriel} - {original.detailsAchat?.quantite} unité(s)</div>
                    </div>
                );
            } else if (original.type === RequestType.LEND) {
                return (
                    <div className="text-sm">
                        <div><span className="font-medium">{original.detailsPret?.materiel?.nom}</span></div>
                        <div className="text-muted-foreground">
                            {format(new Date(original.detailsPret?.dateDebut || ""), "dd/MM/yyyy")} - {format(new Date(original.detailsPret?.dateFin || ""), "dd/MM/yyyy")}
                        </div>
                    </div>
                );
            }
            
            return <div>Détails non disponibles</div>;
        },
    },
    {
        id: "actions",
        header: "Actions",
        enableColumnFilter: false,
        cell: ({ row }) => {
            const original = row.original;
            const [openApprove, setOpenApprove] = useState(false);
            const [openReject, setOpenReject] = useState(false);
            const [notes, setNotes] = useState(original.notes || "");

            const handleApprove = async () => {
                const success = await updateRequestStatus(original.id, RequestStatus.APPROVED, notes);
                if (success) {
                    setOpenApprove(false);
                }
            };

            const handleReject = async () => {
                const success = await updateRequestStatus(original.id, RequestStatus.REJECTED, notes);
                if (success) {
                    setOpenReject(false);
                }
            };

            // N'affiche pas les actions si la demande est déjà traitée
            if (original.statut === RequestStatus.APPROVED || original.statut === RequestStatus.REJECTED || original.statut === RequestStatus.COMPLETED) {
                return (
                    <Button variant="outline" size="sm" asChild>
                        <a href={`/demandes/${original.id}`}>Détails</a>
                    </Button>
                );
            }

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                                <a href={`/demandes/${original.id}`}>Voir les détails</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                className="text-green-600 flex items-center gap-2" 
                                onClick={() => setOpenApprove(true)}
                            >
                                <CheckCircle size={16} /> Approuver
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                className="text-red-600 flex items-center gap-2" 
                                onClick={() => setOpenReject(true)}
                            >
                                <XCircle size={16} /> Rejeter
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Dialog pour approuver */}
                    <Dialog open={openApprove} onOpenChange={setOpenApprove}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Approuver la demande</DialogTitle>
                            </DialogHeader>
                            <Textarea
                                placeholder="Notes supplémentaires (optionnel)"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="min-h-[100px]"
                            />
                            <DialogFooter className="flex justify-end gap-2 mt-4">
                                <Button variant="ghost" onClick={() => setOpenApprove(false)}>
                                    Annuler
                                </Button>
                                <Button
                                    variant="default"
                                    onClick={handleApprove}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    Confirmer l'approbation
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Dialog pour rejeter */}
                    <Dialog open={openReject} onOpenChange={setOpenReject}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Rejeter la demande</DialogTitle>
                            </DialogHeader>
                            <Textarea
                                placeholder="Motif du rejet (recommandé)"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="min-h-[100px]"
                            />
                            <DialogFooter className="flex justify-end gap-2 mt-4">
                                <Button variant="ghost" onClick={() => setOpenReject(false)}>
                                    Annuler
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleReject}
                                >
                                    Confirmer le rejet
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </>
            );
        }
    }
];  ²