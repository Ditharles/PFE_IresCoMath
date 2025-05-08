import React, { useState, useEffect } from "react";
import { FileDown, RefreshCw } from "lucide-react";
import { Button } from "../../ui/button";
import { toast } from "../../Toast";
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

const Requests = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState<Request[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        byType: {},
        byStatus: {},
        total: 0
    });

    // Filtres
    const [globalFilter, setGlobalFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const manageRequestService = new ManageRequestsService();
    const requestsService = new RequestsService();

    // Calculer les statistiques
    const calculateStats = (data: Request[]) => {
        const stats: {
            byType: { [key: string]: number };
            byStatus: { [key in RequestStatus]: number };
            total: number;
        } = {
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
            total: data.length
        };

        data.forEach(request => {
            stats.byType[request.type] = (stats.byType[request.type] || 0) + 1;
            stats.byStatus[request.status] = (stats.byStatus[request.status] || 0) + 1;
        });

        return stats;
    };

    // Charger les données
    const fetchData = async () => {
        setIsLoading(true);
        try {
            if (user.role === "DIRECTEUR") {
                const response = await manageRequestService.getAllRequests();
                setRequests(response.data);
                setStats(calculateStats(response.data));
            }
            else {
                const response = await requestsService.getRequests();
                setRequests(response.data);
                setStats(calculateStats(response.data));
            }
        } catch (error) {
            console.error("Error fetching requests:", error);
            toast.error("Erreur lors de la récupération des demandes");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filtrer les données pour les statistiques
    const getFilteredStats = () => {
        let filteredData = requests;

        if (globalFilter) {
            filteredData = filteredData.filter(request =>
                request.user.firstName.toLowerCase().includes(globalFilter.toLowerCase()) ||
                request.user.lastName.toLowerCase().includes(globalFilter.toLowerCase()) ||
                request.user.email.toLowerCase().includes(globalFilter.toLowerCase())
            );
        }

        if (typeFilter) {
            filteredData = filteredData.filter(request => request.type === typeFilter);
        }

        if (statusFilter) {
            filteredData = filteredData.filter(request => request.status === statusFilter);
        }

        return calculateStats(filteredData);
    };



    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Gestion des demandes</h1>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => exportDataToCSV(requests, "demandes")}>
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

            {/* Filtres supplémentaires */}
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

                        <SelectItem value="PENDING">En attente</SelectItem>
                        <SelectItem value="APPROVED">Approuvé</SelectItem>
                        <SelectItem value="APPROVED_BY_SUPERVISOR">Approuvé par le superviseur</SelectItem>
                        <SelectItem value="APPROVED_BY_DIRECTOR">Approuvé par le directeur</SelectItem>
                        <SelectItem value="REJECTED">Rejeté</SelectItem>
                        <SelectItem value="REJECTED_BY_SUPERVISOR">Rejeté par le superviseur</SelectItem>
                        <SelectItem value="REJECTED_BY_DIRECTOR">Rejeté par le directeur</SelectItem>
                        <SelectItem value="COMPLETED">Complété</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Statistiques */}
            <RequestStats stats={getFilteredStats()} />

            {/* Tableau des demandes */}
            <BaseDataTable
                columns={columns}
                data={requests}
                isLoading={isLoading}
                onRefresh={fetchData}
            />
        </div>
    );
};

export default Requests;