import React, { useState, useEffect, useMemo, useCallback } from "react";
import { FileDown, RefreshCw } from "lucide-react";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import { Request } from "../../../types/request";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Input } from "../../ui/input";
import { BaseDataTable } from "../BaseDataTable";
import RequestStats from "./RequestsStats";
import ManageRequestsService from "../../../services/manageRequests.service";
import { RequestStatus } from "../../../types/MemberAddRequest";
import { columns } from "./columns";
import { exportDataToCSV } from "../../../utils/membersUtils";
import { useAuth } from "../../../contexts/AuthContext";
import RequestsService from "../../../services/requests.service";

interface RequestsProps {
    filterStatuses?: RequestStatus[];
}

interface RequestStatsData {
    byType: Record<string, number>;
    byStatus: Record<RequestStatus, number>;
    total: number;
}

const DEFAULT_STATS: RequestStatsData = {
    byType: {},
    byStatus: {
        [RequestStatus.PENDING]: 0,
        [RequestStatus.APPROVED]: 0,
        [RequestStatus.APPROVED_BY_SUPERVISOR]: 0,
        [RequestStatus.APPROVED_BY_DIRECTOR]: 0,
        [RequestStatus.REJECTED]: 0,
        [RequestStatus.REJECTED_BY_SUPERVISOR]: 0,
        [RequestStatus.REJECTED_BY_DIRECTOR]: 0,
        [RequestStatus.COMPLETED]: 0
    },
    total: 0
};

const Requests: React.FC<RequestsProps> = ({ filterStatuses }) => {
    const { user } = useAuth();
    const [requests, setRequests] = useState<Request[]>([]);
    const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState<RequestStatsData>(DEFAULT_STATS);

    // Filtres
    const [globalFilter, setGlobalFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const manageRequestService = useMemo(() => new ManageRequestsService(), []);
    const requestsService = useMemo(() => new RequestsService(), []);

    const calculateStats = useCallback((data: Request[]): RequestStatsData => {
        const newStats: RequestStatsData = {
            byType: {},
            byStatus: { ...DEFAULT_STATS.byStatus },
            total: data.length
        };

        data.forEach(request => {
            newStats.byType[request.type] = (newStats.byType[request.type] || 0) + 1;
            newStats.byStatus[request.status] += 1;
        });

        if (filterStatuses) {
            const filteredByStatus: Partial<Record<RequestStatus, number>> = {};
            filterStatuses.forEach(status => {
                if (newStats.byStatus[status] !== undefined) {
                    filteredByStatus[status] = newStats.byStatus[status];
                }
            });
            return {
                ...newStats,
                byStatus: filteredByStatus as Record<RequestStatus, number>
            };
        }

        return newStats;
    }, [filterStatuses]);

    const applyFilters = useCallback(() => {
        let filtered = [...requests];

        if (globalFilter) {
            const searchTerm = globalFilter.toLowerCase();
            filtered = filtered.filter(request =>
                request.user.firstName.toLowerCase().includes(searchTerm) ||
                request.user.lastName.toLowerCase().includes(searchTerm) ||
                request.user.email.toLowerCase().includes(searchTerm)
            );
        }

        if (typeFilter) {
            filtered = filtered.filter(request => request.type === typeFilter);
        }

        if (statusFilter) {
            filtered = filtered.filter(request => request.status === statusFilter);
        }

        setFilteredRequests(filtered);
        setStats(calculateStats(filtered));
    }, [requests, globalFilter, typeFilter, statusFilter, calculateStats]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = user.role === "DIRECTEUR"
                ? await manageRequestService.getAllRequests()
                : await requestsService.getRequests();

            const initialFilteredRequests = filterStatuses
                ? response.data.filter((request: { status: RequestStatus; }) => filterStatuses.includes(request.status))
                : response.data;

            setRequests(initialFilteredRequests);
            setFilteredRequests(initialFilteredRequests);
            setStats(calculateStats(initialFilteredRequests));
        } catch (error) {
            console.error("Error fetching requests:", error);
            toast.error("Erreur lors de la récupération des demandes");
        } finally {
            setIsLoading(false);
        }
    }, [user.role, filterStatuses, manageRequestService, requestsService, calculateStats]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleRequestUpdate = (updatedRequest: Request) => {
        fetchData();
    };

    const handleRequestDelete = useCallback((deletedRequestId: string) => {
        setRequests(prevRequests => {
            const updatedRequests = prevRequests.filter(request => request.id !== deletedRequestId);
            setFilteredRequests(updatedRequests);
            setStats(calculateStats(updatedRequests));
            return updatedRequests;
        });
    }, [calculateStats]);

    const handleExport = useCallback(() => {
        exportDataToCSV(filteredRequests, "demandes");
    }, [filteredRequests]);

    return (
        <div className="space-y-6  h-full bg-background p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Gestion des demandes</h1>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleExport}
                        disabled={isLoading}
                    >
                        <FileDown className="h-4 w-4 mr-2" />
                        Exporter
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchData}
                        disabled={isLoading}
                    >
                        <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                        Actualiser
                    </Button>
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                <div className="w-full md:w-auto">
                    <Input
                        placeholder="Rechercher un demandeur..."
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="w-full md:w-[300px]"
                    />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filtrer par type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="INTERNSHIP">Stage</SelectItem>
                        <SelectItem value="MISSION">Mission</SelectItem>
                        <SelectItem value="CONFERENCE">Conférence</SelectItem>
                        <SelectItem value="ARTICLE_REGISTRATION">Article</SelectItem>
                        <SelectItem value="EQUIPMENT_LOAN">Prêt Matériel</SelectItem>
                        <SelectItem value="EQUIPMENT_PURCHASE">Achat Matériel</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filtrer par statut" />
                    </SelectTrigger>
                    <SelectContent>
                        {!filterStatuses && (
                            <>
                                <SelectItem value="PENDING">En attente</SelectItem>
                                <SelectItem value="APPROVED">Approuvé</SelectItem>
                                <SelectItem value="APPROVED_BY_SUPERVISOR">Approuvé par le superviseur</SelectItem>
                                <SelectItem value="APPROVED_BY_DIRECTOR">Approuvé par le directeur</SelectItem>
                                <SelectItem value="REJECTED">Rejeté</SelectItem>
                                <SelectItem value="REJECTED_BY_SUPERVISOR">Rejeté par le superviseur</SelectItem>
                                <SelectItem value="REJECTED_BY_DIRECTOR">Rejeté par le directeur</SelectItem>
                                <SelectItem value="COMPLETED">Complété</SelectItem>
                            </>
                        )}
                        {filterStatuses?.includes(RequestStatus.PENDING) && (
                            <SelectItem value="PENDING">En attente</SelectItem>
                        )}
                        {filterStatuses?.includes(RequestStatus.APPROVED) && (
                            <SelectItem value="APPROVED">Approuvé</SelectItem>
                        )}
                        {filterStatuses?.includes(RequestStatus.APPROVED_BY_SUPERVISOR) && (
                            <SelectItem value="APPROVED_BY_SUPERVISOR">Approuvé par le superviseur</SelectItem>
                        )}
                        {filterStatuses?.includes(RequestStatus.APPROVED_BY_DIRECTOR) && (
                            <SelectItem value="APPROVED_BY_DIRECTOR">Approuvé par le directeur</SelectItem>
                        )}
                        {filterStatuses?.includes(RequestStatus.REJECTED) && (
                            <SelectItem value="REJECTED">Rejeté</SelectItem>
                        )}
                        {filterStatuses?.includes(RequestStatus.REJECTED_BY_SUPERVISOR) && (
                            <SelectItem value="REJECTED_BY_SUPERVISOR">Rejeté par le superviseur</SelectItem>
                        )}
                        {filterStatuses?.includes(RequestStatus.REJECTED_BY_DIRECTOR) && (
                            <SelectItem value="REJECTED_BY_DIRECTOR">Rejeté par le directeur</SelectItem>
                        )}
                        {filterStatuses?.includes(RequestStatus.COMPLETED) && (
                            <SelectItem value="COMPLETED">Complété</SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>

            {/* Statistiques */}
            <RequestStats stats={stats} filterStatuses={filterStatuses} />

            {/* Tableau des demandes */}
            <BaseDataTable
                columns={columns({ onRequestUpdate: handleRequestUpdate, onRequestDelete: handleRequestDelete })}
                data={filteredRequests}
                isLoading={isLoading}
                onRefresh={fetchData}
            />
        </div>
    );
};

export default React.memo(Requests);