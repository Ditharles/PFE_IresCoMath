import { Badge } from "../../../ui/badge";

import { RequestType } from "../../../../types/request";
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card";
import { EquipmentCategory, EquipmentType } from "../../../../types/equipment";
import { EQUIPMENT_TYPE_LABELS } from "../../../../constants/equipments";

interface CategoriesStatsProps {
    categories: EquipmentCategory[];
}

const CategoriesStats = ({ categories }: CategoriesStatsProps) => {
    const stats = {
        total: categories.length,
        byType: categories.reduce((acc, category) => {
            acc[category.type] = (acc[category.type] || 0) + 1;
            return acc;
        }, {} as Record<string, number>)
    };

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
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
                            className="mb-2 mr-2"
                        >
                            {EQUIPMENT_TYPE_LABELS[type as EquipmentType] || type}: {count}
                        </Badge>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default CategoriesStats;