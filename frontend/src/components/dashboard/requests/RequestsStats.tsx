import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { RequestStatus } from "../../../types/MemberAddRequest";
import { REQUEST_TYPE_LABELS, STATUS_BADGE_VARIANTS, STATUS_TRANSLATIONS } from "../../../constants/requests";
import { RequestType } from "../../../types/request";

const getStatusBadge = (status: RequestStatus, count: number) => {
    return (
        <Badge
            key={`${status}-${count}`}
            className={`${STATUS_BADGE_VARIANTS[status] || "bg-gray-100 text-gray-800"} mb-2 mr-2`}
        >{STATUS_TRANSLATIONS[status] || status}: {count}
        </Badge>
    );
};

interface RequestStatsProps {
    stats: {
        total: number;
        byType: Record<string, number>;
        byStatus: Record<RequestStatus, number>;
    };
    filterStatuses?: RequestStatus[];
}

export default function RequestStats({ stats, filterStatuses }: RequestStatsProps) {
    // Filtrer les statuts si filterStatuses est défini
    const filteredStatusStats = filterStatuses
        ? Object.fromEntries(
            Object.entries(stats.byStatus).filter(([status]) =>
                filterStatuses.includes(status as RequestStatus)
            )
        )
        : stats.byStatus;

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            {/* Carte: Total des demandes */}
            <Card key="total-requests-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total des demandes
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
            </Card>

            {/* Carte: Demandes par type */}
            <Card key="by-type-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Par type
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap">
                    {Object.entries(stats.byType).map(([type, count]) => (
                        <Badge
                            key={`type-${type}`}
                            variant="outline"
                            className="mb-2 mr-2"
                        >
                            {REQUEST_TYPE_LABELS[type as RequestType]}: {count}
                        </Badge>
                    ))}
                </CardContent>
            </Card>

            {/* Carte: Demandes par statut */}
            <Card key="by-status-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Par statut
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap">
                    {Object.entries(filteredStatusStats).map(([status, count]) => (
                        getStatusBadge(
                            status as RequestStatus,
                            count
                        )
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}