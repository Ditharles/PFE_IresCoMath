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
            header: "Nom de l'équipement",
            cell: ({ row }) => (
                <div className="font-medium break-words">
                    <a
                        href={`/materiel/${row.original.id}`}
                        className="hover:text-blue-600 hover:underline transition-colors"
                    >
                        {row.getValue("name")}
                    </a>
                </div>
            ),
        },
        {
            accessorKey: "type",
            header: "Type ",
            cell: ({ row }) => {
                const category = row.original.category;
                return (
                    <div className="capitalize whitespace-nowrap">
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
            header: "Date d'entrée",
            cell: ({ row }) => (
                <div className="whitespace-nowrap">
                    {formatDate(row.getValue("acquisitionDate"))}
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Disponibilité",
            cell: ({ row }) => {
                return (
                    <Badge
                        variant="outline"
                        className={`whitespace-nowrap capitalize ${EQUIPMENT_STATUS_BADGES[row.getValue("status") as EquipmentStatus]
                            }`}
                    >
                        {EQUIPMENT_STATUS_LABELS[row.getValue("status") as EquipmentStatus]}
                    </Badge>
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
            header: "Réservations ",
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
                        className={`whitespace-nowrap ${count > 0
                            ? "bg-blue-50 text-blue-600"
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
                        equipment={row.original}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                </div>
            ),
        },
    ];

    if (!isCategoryPage) {
        baseColumns.splice(2, 0, {
            accessorKey: "category",
            header: "Catégorie associée",
            cell: ({ row }) => {
                const category = row.original.category;
                return (
                    <div className="capitalize whitespace-nowrap">
                        <a
                            href={`/materiels/categories/${category?.id}`}
                            className="hover:text-blue-600 hover:underline transition-colors"
                        >
                            {category?.name || "-"}
                        </a>
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