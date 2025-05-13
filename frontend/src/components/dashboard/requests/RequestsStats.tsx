import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { RequestStatus } from "../../../types/MemberAddRequest";

const getRequestTypeLabel = (type: string) => {
    switch (type) {
        case "INTERNSHIP": return "Stage";
        case "MISSION": return "Mission";
        case "CONFERENCE": return "Conférence";
        case "ARTICLE_REGISTRATION": return "Article";
        case "EQUIPMENT_LOAN": return "Prêt Matériel";
        case "EQUIPMENT_PURCHASE": return "Achat Matériel";
        case "REPAIR_MAINTENANCE": return "Réparation";
        case "TRAVEL_ACCOMMODATION": return "Voyage";
        case "CONTRACTUAL": return "Contractuel";
        default: return type;
    }
};

const getStatusBadge = (status: RequestStatus, count: number) => {
    const variants = {
        [RequestStatus.PENDING]: "bg-yellow-100 text-yellow-800",
        [RequestStatus.APPROVED]: "bg-green-100 text-green-800",
        [RequestStatus.APPROVED_BY_SUPERVISOR]: "bg-blue-100 text-blue-800",
        [RequestStatus.APPROVED_BY_DIRECTOR]: "bg-purple-100 text-purple-800",
        [RequestStatus.REJECTED]: "bg-red-100 text-red-800",
        [RequestStatus.REJECTED_BY_SUPERVISOR]: "bg-orange-100 text-orange-800",
        [RequestStatus.REJECTED_BY_DIRECTOR]: "bg-rose-100 text-rose-800",
        [RequestStatus.COMPLETED]: "bg-emerald-100 text-emerald-800",
    };

    return (
        <Badge
            key={`${status}-${count}`}
            className={`${variants[status] || "bg-gray-100 text-gray-800"} mb-2 mr-2`}
        >
            {status.toString().replace(/_/g, " ")}: {count}
        </Badge>
    );
};

interface RequestStatsProps {
    stats: {
        total: number;
        byType: Record<string, number>;
        byStatus: Record<RequestStatus, number>;
    };
}

export default function RequestStats({ stats }: RequestStatsProps) {
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
                            {getRequestTypeLabel(type)}: {count as number}
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
                    {Object.entries(stats.byStatus).map(([status, count]) => (
                        getStatusBadge(
                            status as unknown as RequestStatus,
                            count as number
                        )
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}