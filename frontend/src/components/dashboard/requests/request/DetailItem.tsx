import { ReactNode } from "react";

interface DetailItemProps {
    label: string;
    value?: unknown;
    children?: ReactNode;
}

export const DetailItem = ({ label, value, children }: DetailItemProps) => (
    <div className="flex flex-col">
        <span className="text-sm text-gray-500 mb-1">{label}</span>
        {children || (
            <span className="font-medium">
                {value != null ? value.toString() : "Non spécifié"}
            </span>
        )}
    </div>
);