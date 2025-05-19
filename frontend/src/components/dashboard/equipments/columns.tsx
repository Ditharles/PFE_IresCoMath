import { ColumnDef } from "@tanstack/react-table";

import { EQUIPMENT_STATUS_BADGES, EQUIPMENT_STATUS_LABELS, EQUIPMENT_TYPE_LABELS } from "../../../constants/equipments";
import { Equipment, EquipmentCategory, EquipmentStatus, EquipmentType } from "../../../types/equipment";
import { RequestStatus } from "../../../types/MemberAddRequest";
import { formatDate } from "../../../utils/utils";

import { Badge } from "../../ui/badge";
import ActionsCell from "./actions";

export const columns = ({
    onUpdate,
    onDelete,
    categories,
    isCategoryPage,
}: {
    onUpdate: (updated: Equipment) => void;
    onDelete: (deletedId: string) => void;
    categories: EquipmentCategory[];
    isCategoryPage: boolean;
}): ColumnDef<Equipment>[] => {
    const baseColumns: ColumnDef<Equipment>[] = [
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
            cell: ({ row }) => {
                const category = row.original.category;
                return (
                    <div className="capitalize">
                        {category ? EQUIPMENT_TYPE_LABELS[category.type as EquipmentType] : "-"}
                    </div>
                );
            },
            meta: {
                filterVariant: 'select',
                filterSelectOptions: Object.entries(EQUIPMENT_TYPE_LABELS).map(([value, label]) => ({
                    value,
                    label
                }))
            },
        },
        {
            accessorKey: "acquisitionDate",
            header: "Date d'acquisition/d'enregistrement",
            cell: ({ row }) => formatDate(row.getValue("acquisitionDate")),
        },
        {
            accessorKey: "status",
            header: "Statut",
            cell: ({ row }) => {
                return (
                    <div className={`capitalize ${EQUIPMENT_STATUS_BADGES[row.getValue("status") as EquipmentStatus]}`}>
                        {EQUIPMENT_STATUS_LABELS[row.getValue("status") as EquipmentStatus]}
                    </div>
                );
            },
            meta: {
                filterVariant: 'select',
                filterSelectOptions: Object.entries(EQUIPMENT_STATUS_LABELS).map(([value, label]) => ({
                    value,
                    label
                }))
            },
        },
        {
            accessorKey: "requestsCount",
            header: "Demandes spécifiques en attente",
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
                        variant={count > 0 ? "secondary" : "outline"}
                        className={count > 0 ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-500"}
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
                    equipment={row.original}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            ),
        },
    ];


    if (!isCategoryPage) {
        baseColumns.splice(2, 0, {
            accessorKey: "category",
            header: "Catégorie",
            cell: ({ row }) => {
                const category = row.original.category;
                return (
                    <div className="capitalize">
                        {category?.name || "-"}
                    </div>
                );
            },
            meta: {
                filterVariant: 'select',
                filterSelectOptions: categories.map((category) => ({
                    value: category.id,
                    label: category.name
                }))
            },
            accessorFn: (row) => row.category?.id,
        });
    }

    return baseColumns;
};