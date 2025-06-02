import { Laptop } from "lucide-react";
import {
    EquipmentLoanRequest

} from "../../../../../types/request"
import { DetailItem } from "../DetailItem";
import { DetailSection } from "../DetailSection";

import { formatDate } from "../../../../../utils/utils";

const EquipmentLoanDetails = ({ loanRequest }: { loanRequest: EquipmentLoanRequest; }) => {
    return (

        <DetailSection
            icon={<Laptop className="h-5 w-5 text-yellow-500" />}
            title="Détails de l'emprunt"
        >
            {loanRequest.equipment && (
                <DetailItem label="Équipement" value={loanRequest.equipment.name} />
            )}
            {loanRequest.category && (
                <DetailItem label="Catégorie" value={loanRequest.category.name} />
            )}
            <DetailItem label="Quantité" value={loanRequest.quantity} />
            <DetailItem label="Date de début" value={formatDate(loanRequest.startDate)} />
            <DetailItem label="Date de fin" value={formatDate(loanRequest.endDate)} />
        </DetailSection>

    )
}

export default EquipmentLoanDetails