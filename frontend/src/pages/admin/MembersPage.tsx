import { useState, useEffect } from "react";
import { toast } from "sonner";
import MembersList from "../../components/dashboard/directeur/members/MembersList";
import { ManageUserService } from "../../services/manageUser.service";
import { User } from "../../types/Member";

const MembersPage = () => {
    const [members, setMembers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const manageUserService = new ManageUserService();

    const fetchMembers = async () => {
        try {
            const response = await manageUserService.getUsers();
            setMembers(response.data);
        } catch (error) {
            toast.error("Erreur lors du chargement des membres");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleExportToCSV = () => {
        // Fonction d'export CSV à implémenter si nécessaire
        toast.info("Fonctionnalité d'export à venir");
    };

    return (
        <div className="p-6">
            <MembersList
                members={members}
                isLoading={isLoading}
                onRefresh={fetchMembers}
                exportToCSV={handleExportToCSV}
            />
        </div>
    );
};

export default MembersPage; 