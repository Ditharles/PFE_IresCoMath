import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../../ui/badge";
import { RequestStatus } from "../../../types/MemberAddRequest";
import { Request, RequestType } from "../../../types/request";
import { REQUEST_TYPE_LABELS, STATUS_BADGE_VARIANTS } from "../../../constants/requests";
import { formatDate } from "../../../utils/utils";
import ActionsCell from "./actions";

const getRequestDetails = (request: Request): string => {
    if ('stage' in request && request.stage?.organization) {
        return request.stage.organization;
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

export const columns = ({
    onRequestUpdate,
    onRequestDelete
}: {
    onRequestUpdate: (updatedRequest: Request) => void;
    onRequestDelete: (deletedRequestId: string) => void;
}): ColumnDef<Request>[] => [
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
        cell: ({ row }) => (
            <ActionsCell 
                request={row.original} 
                onRequestUpdate={onRequestUpdate}
                onRequestDelete={onRequestDelete}
            />
        ),
    },
];