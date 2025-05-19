import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../../../ui/badge";
import { EquipmentCategory, EquipmentType } from "../../../../types/equipment";
import { RequestStatus } from "../../../../types/request";
import { formatDate } from "../../../../utils/utils";
import ActionsCell from "./actions";
import { EQUIPMENT_TYPE_LABELS } from "../../../../constants/equipments";



export const columns = ({
    onCategoryUpdate,
    onCategoryDelete,
}: {
    onCategoryUpdate: (updatedCategory: EquipmentCategory) => void;
    onCategoryDelete: (deletedCategoryId: string) => void;
}): ColumnDef<EquipmentCategory>[] => [
        {
            accessorKey: "name",
            header: "Nom",
            cell: ({ row }) => (
                <div className="font-medium">
                    {row.getValue("name")}
                </div>
            ),
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => (
                <div className="capitalize">
                    {EQUIPMENT_TYPE_LABELS[row.getValue("type") as EquipmentType]}
                </div>
            ),
            meta: {
                filterVariant: 'select',
                filterSelectOptions: Object.entries(EQUIPMENT_TYPE_LABELS).map(([value, label]) => ({
                    value,
                    label
                }))
            },
        },
        {
            accessorKey: "quantity",
            header: "Quantité",
            cell: ({ row }) => (
                <div className="text-center">
                    {row.getValue("quantity")}
                </div>
            ),
        },
        {
            accessorKey: "updatedAt",
            header: "Dernière mise à jour",
            cell: ({ row }) => formatDate(row.getValue("updatedAt")),
        },
        {
            accessorKey: "requestsCount",
            header: "Demandes en attente",
            cell: ({ row }) => {
                const equipmentLoanRequests = row.original.equipmentLoanRequests;
                let count = 0;
                if (equipmentLoanRequests) {
                    count = equipmentLoanRequests.filter(
                        (request) => request.status === RequestStatus.PENDING
                    ).length;
                }
                return (
                    <Badge
                        variant="outline"
                        className={count > 0 ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-gray-50 text-gray-500"}
                    >
                        {count} {count === 1 ? "demande" : "demandes"}
                    </Badge>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <ActionsCell
                    category={row.original}
                    onCategoryUpdate={onCategoryUpdate}
                    onCategoryDelete={onCategoryDelete}
                />
            ),
        },
    ];