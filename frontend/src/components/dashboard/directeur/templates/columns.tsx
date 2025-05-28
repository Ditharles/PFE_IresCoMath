import { ColumnDef } from "@tanstack/react-table";
import { Template } from "../../../../types/templates";
import { formatDate } from "../../../../utils/utils";
import { RequestType } from "../../../../types/request";
import ActionsCell from "./actions";
import { REQUEST_TYPE_LABELS } from "../../../../constants/requests";

export const columns = ({
    onTemplateDelete,
}: {
    onTemplateDelete: (templateId: string) => void;
}): ColumnDef<Template>[] => [
        {
            accessorKey: "name",
            header: "Nom",
            cell: ({ row }) => (
                <div className="font-medium">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "for",
            header: "Type",
            cell: ({ row }) => REQUEST_TYPE_LABELS[row.getValue("for") as RequestType] || row.getValue("for"),
            meta: {
                filterVariant: "select",
                filterOptions: Object.entries(REQUEST_TYPE_LABELS).map(([value, label]) => ({
                    value,
                    label
                }))
            }
        },
        {
            accessorKey: "placeholders",
            header: "Champs disponibles",
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-1">
                    {(row.getValue("placeholders") as string[]).map(
                        (placeholder, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                                {placeholder}
                            </span>
                        )
                    )}
                </div>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "Date de création",
            cell: ({ row }) => (
                <div className="whitespace-nowrap">
                    {formatDate(row.getValue("createdAt"))}
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
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="whitespace-nowrap">
                    <ActionsCell template={row.original} onDelete={onTemplateDelete} />
                </div>
            ),
        },
    ];
