import { useState, useCallback, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import { ManageUserService } from "../../../services/manageUser.service";

import Filters from "../Filters";
import MembersAddRequests from "./membersAddRequests/MembersAddRequests";
import MembersList from "./members/MembersList";
import { useFilteredUsers, exportDataToCSV } from "../../../utils/membersUtils";
import { RequestStatus, RequestUser } from "../../../types/MemberAddRequest";
import { User } from "../../../types/Member";

const Members = () => {
    // États pour les filtres
    const [searchQuery, setSearchQuery] = useState("");
    const [filterRole, setFilterRole] = useState("");
    const [filterStatus, setFilterStatus] = useState<RequestStatus | undefined>(undefined);
    const [activeTab, setActiveTab] = useState("all");

    // États pour les données
    const [membersRequest, setMembersRequest] = useState<RequestUser[]>([]);
    const [members, setMembers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const manageUserService = new ManageUserService();

    // Filtrage des utilisateurs
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
        filterStatus,
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
            console.log("membersRequestList.data", membersRequestList.data);
            const allMembersRequest: RequestUser[] = [
                ...membersRequestList.data.MASTER,
                ...membersRequestList.data.DOCTORANT,
                ...membersRequestList.data.ENSEIGNANT,
            ];
            setMembersRequest(allMembersRequest);

            // Récupérer les membres existants
            const membersList = await manageUserService.getUsers();
            setMembers(membersList.data);
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
        <div className="space-y-6 h-full bg-background text-foreground p-6 rounded-lg shadow-md">
            <main className="flex-1  ">
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

                <MembersAddRequests
                    requests={filteredRequests}
                    isLoading={isLoading}

                    onRefresh={fetchData}
                    exportToCSV={() => handleExportToCSV('requests')}
                />

                <MembersList
                    members={filteredMembers}
                    isLoading={isLoading}
                    onRefresh={fetchData}
                    exportToCSV={() => handleExportToCSV('members')}
                />
            </main>
        </div>
    );
};

export default Members;