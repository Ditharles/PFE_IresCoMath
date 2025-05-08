/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { FileText, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "../../ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { toast } from "../../Toast";
import RequestsService from "../../../services/requests.service";
import { RequestStatus } from "../../../types/MemberAddRequest";
import { Request, RequestType } from "../../../types/request";

const requestService = new RequestsService();

// Constants for better maintainability
const REQUEST_TYPE_LABELS: Record<RequestType, string> = {
    [RequestType.INTERNSHIP]: "Stage",
    [RequestType.MISSION]: "Mission",
    [RequestType.CONFERENCE]: "Conférence",
    [RequestType.ARTICLE_REGISTRATION]: "Inscription Article",
    [RequestType.EQUIPMENT_LOAN]: "Prêt Matériel",
    [RequestType.EQUIPMENT_PURCHASE]: "Achat Matériel",
    [RequestType.REPAIR_MAINTENANCE]: "Réparation",
    [RequestType.TRAVEL_ACCOMMODATION]: "Voyage",
    [RequestType.CONTRACTUAL]: "Contractuel"
};

const STATUS_BADGE_VARIANTS: Record<RequestStatus, string> = {
    [RequestStatus.PENDING]: "bg-yellow-100 text-yellow-800",
    [RequestStatus.APPROVED]: "bg-green-100 text-green-800",
    [RequestStatus.APPROVED_BY_SUPERVISOR]: "bg-blue-100 text-blue-800",
    [RequestStatus.APPROVED_BY_DIRECTOR]: "bg-purple-100 text-purple-800",
    [RequestStatus.REJECTED]: "bg-red-100 text-red-800",
    [RequestStatus.REJECTED_BY_SUPERVISOR]: "bg-orange-100 text-orange-800",
    [RequestStatus.REJECTED_BY_DIRECTOR]: "bg-rose-100 text-rose-800",
    [RequestStatus.COMPLETED]: "bg-emerald-100 text-emerald-800"
};

// Helper functions
const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

const getRequestDetails = (request: Request): string => {
    if ('requestStage' in request && request.requestStage?.company) {
        return request.requestStage.company;
    }
    if ('mission' in request && request.mission?.country) {
        return request.mission.country;
    }
    if ('scientificEvent' in request && request.scientificEvent?.title) {
        return request.scientificEvent.title;
    }
    if ('articleRegistration' in request && request.articleRegistration?.conference) {
        return request.articleRegistration.conference;
    }
    if ('equipmentLoanRequest' in request) {
        return request.equipmentLoanRequest?.equipment?.name ||
            request.equipmentLoanRequest?.category?.name || "-";
    }
    if ('purchaseRequest' in request && request.purchaseRequest?.name) {
        return request.purchaseRequest.name;
    }
    return "-";
};

const deleteRequest = async (id: string): Promise<boolean> => {
    try {
        const response = await requestService.deleteRequest(id);
        toast.success(response?.data?.message);
        return true;
    } catch (error) {
        console.error("Delete request error:", error);
        toast.error("Une erreur est survenue lors de la suppression");
        return false;
    }
};


const ActionsCell = ({ request }: { request: Request }) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDelete = async () => {
        const success = await deleteRequest(request.id);
        if (success) {
            setIsDeleteDialogOpen(false);
        }
    };


    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Ouvrir le menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                        <a href={`/demandes/${request.id}`} className="flex items-center w-full">
                            <Eye className="h-4 w-4 mr-2" />
                            Voir détails
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <a href={`/demandes/${request.id}/edit`} className="flex items-center w-full">
                            <FileText className="h-4 w-4 mr-2" />
                            Modifier
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => setIsDeleteDialogOpen(true)}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirmer la suppression</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-gray-600">
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
    );
};


export const columns: ColumnDef<Request>[] = [
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => formatDate(row.getValue("createdAt")),
    },
    {
        accessorFn: (row) => `${row.user.lastName} ${row.user.firstName}`,
        id: "user",
        header: "Demandeur",
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-medium">{row.getValue("user")}</span>
                <span className="text-sm text-gray-500">{row.original.user.email}</span>
            </div>
        ),
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => REQUEST_TYPE_LABELS[row.getValue("type") as RequestType] || row.getValue("type"),
    },
    {
        id: "details",
        header: "Détails",
        cell: ({ row }) => getRequestDetails(row.original),
    },
    {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => (
            <Badge className={STATUS_BADGE_VARIANTS[row.getValue("status") as RequestStatus] || "bg-gray-100 text-gray-800"}>
                {String(row.getValue("status")).replace(/_/g, " ")}
            </Badge>
        ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ActionsCell request={row.original} />,
    },
];