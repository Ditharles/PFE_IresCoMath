// MembersPage.jsx
import { useState, useCallback, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "../../ui/button";
import { toast } from "../../Toast";
import { ManageUserService } from "../../../services/manageUser.service";


import Filters from "../Filters";
import MembersAddRequests from "./membersAddRequests/MembersAddRequests";
import MembersList from "./members/MembersList";
import { useFilteredUsers, exportDataToCSV } from "../../../utils/membersUtils";
import { RequestUser } from "../../../types/MemberAddRequest";

const Members = () => {
    // États pour les filtres
    const [searchQuery, setSearchQuery] = useState("");
    const [filterRole, setFilterRole] = useState("");
    const [filterStatus, setFilterStatus] = useState();
    const [activeTab, setActiveTab] = useState("all");

    // États pour les données
    const [membersRequest, setMembersRequest] = useState<RequestUser[]>([]);
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const manageUserService = new ManageUserService();

    // Filtrage des utilisateurs avec les hooks personnalisés
    const filteredRequests = useFilteredUsers(
        membersRequest,
        searchQuery,
        filterRole,
        filterStatus,
        activeTab
    );

    const filteredMembers = useFilteredUsers(
        members,
        searchQuery,
        filterRole,
        undefined, // Pas de filtrage par statut pour les membres
        activeTab
    );

    // Réinitialiser les filtres
    const clearFilters = () => {
        setFilterRole("");
        setFilterStatus(undefined);
        setSearchQuery("");
    };

    // Charger les données
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            // Récupérer les demandes d'adhésion
            const membersRequestList = await manageUserService.getWaitingUsers();
            const allMembersRequest: RequestUser[] = [
                ...membersRequestList.data.MASTER,
                ...membersRequestList.data.DOCTORANT,
                ...membersRequestList.data.ENSEIGNANT,
            ];
            setMembersRequest(allMembersRequest);
            console.log(allMembersRequest)
            // Récupérer les membres
            const membersList = await manageUserService.getUsers();
            setMembers(membersList.data);
            console.log(members)
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Erreur lors de la récupération des données");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Exporter les données en CSV
    const handleExportToCSV = (type: string = "members") => {
        const dataToExport = type === 'requests' ? filteredRequests : filteredMembers;
        const fileName = type === 'requests' ? "demandes-adhesion" : "membres";
        exportDataToCSV(dataToExport, fileName);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 p-6 bg-background">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Gestion des membres</h1>
                    <div className="flex gap-2">
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

                {/* Filtres communs */}
                <Filters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filterRole={filterRole}
                    setFilterRole={setFilterRole}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    clearFilters={clearFilters}
                    showStatusFilter={true}
                />

                {/* Section des demandes d'adhésion */}
                <MembersAddRequests
                    requests={filteredRequests}
                    isLoading={isLoading}
                    activeTab={activeTab}
                    onRefresh={fetchData}
                    exportToCSV={handleExportToCSV}
                />

                {/* Section des membres */}
                <MembersList
                    members={filteredMembers}
                    isLoading={isLoading}

                    onRefresh={fetchData}
                    exportToCSV={handleExportToCSV}
                />
            </main>
        </div>
    );
};

export default Members;