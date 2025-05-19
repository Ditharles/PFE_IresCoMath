import { Badge } from "../../ui/badge";
import { EQUIPMENT_STATUS_LABELS, EQUIPMENT_TYPE_LABELS } from "../../../constants/equipments";
import { Equipment, EquipmentStatus, EquipmentType } from "../../../types/equipment";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";

interface EquipmentStatsProps {
    equipments: Equipment[];
    isCategoryPage?: boolean;
}

const EquipmentStats = ({ equipments, isCategoryPage = false }: EquipmentStatsProps) => {
    const categoryName = equipments[0]?.category?.name || 'cette catégorie';

    const stats = {
        total: equipments.length,
        byStatus: equipments.reduce((acc, equipment) => {
            acc[equipment.status] = (acc[equipment.status] || 0) + 1;
            return acc;
        }, {} as Record<EquipmentStatus, number>),
        byType: equipments.reduce((acc, equipment) => {
            const type = equipment.category?.type;
            if (type) {
                acc[type] = (acc[type] || 0) + 1;
            }
            return acc;
        }, {} as Record<EquipmentType, number>),
        byCategory: equipments.reduce((acc, equipment) => {
            const category = equipment.category?.name;
            if (category) {
                acc[category] = (acc[category] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>),
        withPendingRequests: equipments.filter(e =>
            e.equipmentLoanRequests?.some(r => r.status === 'PENDING')
        ).length
    };

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {isCategoryPage ? `Équipements de ${categoryName}` : 'Total d\'équipements'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Par statut
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {Object.entries(stats.byStatus).map(([status, count]) => (
                        <Badge
                            key={`status-${status}`}
                            variant="outline"
                            className="mb-2"
                        >
                            {EQUIPMENT_STATUS_LABELS[status as EquipmentStatus]}: {count}
                        </Badge>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Par type
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {Object.entries(stats.byType).map(([type, count]) => (
                        <Badge
                            key={`type-${type}`}
                            variant="outline"
                            className="mb-2"
                        >
                            {EQUIPMENT_TYPE_LABELS[type as EquipmentType]}: {count}
                        </Badge>
                    ))}
                </CardContent>
            </Card>

            {!isCategoryPage && (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Par catégorie
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {Object.entries(stats.byCategory).map(([category, count]) => (
                            <Badge
                                key={`category-${category}`}
                                variant="outline"
                                className="mb-2"
                            >
                                {category}: {count}
                            </Badge>
                        ))}
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Demandes en attente
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.withPendingRequests}</div>
                    <p className="text-xs text-muted-foreground">
                        Équipements avec demandes spécifiques
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default EquipmentStats;