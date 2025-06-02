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
            header: "Nom de la catégorie",
            cell: ({ row }) => (
                <div className="font-medium whitespace-nowrap">
                    <a
                        href={`/materiels/categories/${row.original.id}`}
                        className="hover:text-blue-600 hover:underline transition-colors"
                    >
                        {row.getValue("name")}
                    </a>
                </div>
            ),
        },
        {
            accessorKey: "type",
            header: "Type d'équipement",
            cell: ({ row }) => (
                <div className="capitalize whitespace-nowrap">
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
            header: "Quantité disponible",
            cell: ({ row }) => (
                <div className="text-center whitespace-nowrap">
                    {row.getValue("quantity")}
                </div>
            ),
        },
        {
            accessorKey: "updatedAt",
            header: "Date de mise à jour",
            cell: ({ row }) => (
                <div className="whitespace-nowrap">
                    {formatDate(row.getValue("updatedAt"))}
                </div>
            ),
        },
        {
            accessorKey: "requestsCount",
            header: "Demandes en cours",
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
                        className={`whitespace-nowrap ${count > 0
                                ? "bg-blue-50 text-blue-600 border-blue-200"
                                : "bg-gray-50 text-gray-500"
                            }`}
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
                <div className="whitespace-nowrap">
                    <ActionsCell
                        category={row.original}
                        onCategoryUpdate={onCategoryUpdate}
                        onCategoryDelete={onCategoryDelete}
                    />
                </div>
            ),
        },
    ];