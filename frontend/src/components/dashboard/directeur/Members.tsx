import { useState, useMemo, useEffect, useCallback } from "react";
import { ManageUserService } from "../../../services/manageUser.service";
import { toast } from "../../Toast";
import { Search, X, RefreshCw, UserPlus, FileDown } from "lucide-react";

import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";
import { Badge } from "../../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";

import { columns as requestMember } from "./membersAddRequests/columns";
import { columns as membersColumns } from "./members/column";
import { DataTable as DataTableMembersAddRequest } from "./membersAddRequests/DataTable";
import { DataTable as DataTableMembers } from "./members/DataTable";
import { RequestUser, RequestStatus } from "../../../types/MemberAddRequest";
import { RoleEnum } from "../../../types/common";
import { User } from "../../../types/Member";

const Members = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterRole, setFilterRole] = useState("");
    const [filterStatus, setFilterStatus] = useState<RequestStatus | undefined>(undefined);
    const [membersRequest, setMembersRequest] = useState<RequestUser[]>([]);
    const [members, setMembers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");

    const manageUserService = new ManageUserService();

    const fetchMembers = useCallback(async () => {
        setIsLoading(true);
        try {
            // Amélioration de la concaténation des données des demandes
            const membersRequestList = await manageUserService.getWaitingUsers();
            const allMembersRequest = [
                ...membersRequestList.data.MASTER,
                ...membersRequestList.data.DOCTORANT,
                ...membersRequestList.data.ENSEIGNANT,
            ];
            setMembersRequest(allMembersRequest);


            const membersList = await manageUserService.getUsers();
            setMembers(membersList.data);

        } catch (error) {
            console.error("Error fetching members list:", error);
            toast.error("Erreur lors de la récupération des membres");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    // Fonction utilitaire pour déterminer le rôle d'un utilisateur
    const determineRole = (user: any): RoleEnum => {
        if ("annee_these" in user) return RoleEnum.DOCTORANT;
        if ("annee_master" in user) return RoleEnum.MASTER;
        if ("fonction" in user) return RoleEnum.ENSEIGNANT;
        return RoleEnum.ADMIN;
    };

    // Filtrage des demandes d'adhésion
    const filteredRequests = useMemo(() => {
        return membersRequest.filter((request) => {
            const fullName = `${request.nom} ${request.prenom}`.toLowerCase();
            const matchesSearch =
                fullName.includes(searchQuery.toLowerCase()) ||
                request.email.toLowerCase().includes(searchQuery.toLowerCase());

            const role = determineRole(request);

            const matchesRole = filterRole ? role === filterRole : true;
            const matchesStatus = filterStatus ? request.status === filterStatus : true;
            const matchesTab = activeTab === "all" ? true : role === activeTab;

            return matchesSearch && matchesRole && matchesStatus && matchesTab;
        });
    }, [membersRequest, searchQuery, filterRole, filterStatus, activeTab]);

    // Filtrage des membres
    const filteredMembers = useMemo(() => {
        return members.filter((member) => {
            const fullName = `${member.nom} ${member.prenom}`.toLowerCase();
            const matchesSearch =
                fullName.includes(searchQuery.toLowerCase()) ||
                member.email.toLowerCase().includes(searchQuery.toLowerCase());

            const role = determineRole(member);

            const matchesRole = filterRole ? role === filterRole : true;

            const matchesTab = activeTab === "all" ? true : role === activeTab;

            return matchesSearch && matchesRole && matchesTab;
        });
    }, [members, searchQuery, filterRole, filterStatus, activeTab]);

    const clearFilters = () => {
        setFilterRole("");
        setFilterStatus(undefined);
        setSearchQuery("");
    };

    // Calcul des statistiques pour les demandes
    const requestStatusCounts = useMemo(() => {
        return {
            pending: membersRequest.filter(m => m.status === RequestStatus.PENDING).length,
            approved: membersRequest.filter(m => m.status === RequestStatus.APPROVED).length,
            rejected: membersRequest.filter(m => m.status === RequestStatus.REJECTED).length
        };
    }, [membersRequest]);



    // Calcul des statistiques des rôles pour les demandes
    const requestRoleCounts = useMemo(() => {
        return {
            [RoleEnum.DOCTORANT]: membersRequest.filter(m => determineRole(m) === RoleEnum.DOCTORANT).length,
            [RoleEnum.MASTER]: membersRequest.filter(m => determineRole(m) === RoleEnum.MASTER).length,
            [RoleEnum.ENSEIGNANT]: membersRequest.filter(m => determineRole(m) === RoleEnum.ENSEIGNANT).length
        };
    }, [membersRequest]);

    // Calcul des statistiques des rôles pour les membres
    const memberRoleCounts = useMemo(() => {
        return {
            [RoleEnum.DOCTORANT]: members.filter(m => determineRole(m) === RoleEnum.DOCTORANT).length,
            [RoleEnum.MASTER]: members.filter(m => determineRole(m) === RoleEnum.MASTER).length,
            [RoleEnum.ENSEIGNANT]: members.filter(m => determineRole(m) === RoleEnum.ENSEIGNANT).length
        };
    }, [members]);

    // Fonction pour exporter les données en CSV
    const exportToCSV = (type: 'requests' | 'members') => {
        // Déterminer quelle donnée exporter
        const dataToExport = type === 'requests' ? filteredRequests : filteredMembers;
        const fileName = type === 'requests' ? "demandes-adhesion" : "membres";

        // Créer des données CSV
        const headers = ["Nom", "Prénom", "Email", "Rôle", "Statut", "Date de demande"];

        const csvData = dataToExport.map(item => {
            const role = determineRole(item) === RoleEnum.DOCTORANT ? "Doctorant" :
                determineRole(item) === RoleEnum.MASTER ? "Étudiant Master" : "Enseignant";

            return [
                item.nom,
                item.prenom,
                item.email,
                role,

                new Date(item.createdAt).toLocaleDateString()
            ];
        });

        const csvContent = [
            headers.join(','),
            ...csvData.map(row => row.join(','))
        ].join('\n');

        // Créer un blob et télécharger
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `${fileName}-${new Date().toISOString().slice(0, 10)}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                            onClick={fetchMembers}
                            disabled={isLoading}
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                            Actualiser
                        </Button>
                    </div>
                </div>

                {/* Filtres communs */}
                <Card className="mb-6">
                    <CardHeader>
                        <div className="flex justify-between items-center p-1">
                            <CardTitle>Filtres</CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearFilters}
                                className="text-muted-foreground"
                                disabled={!searchQuery && !filterRole && !filterStatus}
                            >
                                <X className="h-4 w-4 mr-2" />
                                Réinitialiser
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Rechercher nom, prénom ou email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <Select value={filterRole} onValueChange={setFilterRole}>
                            <SelectTrigger>
                                <SelectValue placeholder="Rôle" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={RoleEnum.DOCTORANT}>Doctorant</SelectItem>
                                <SelectItem value={RoleEnum.MASTER}>Étudiant Master</SelectItem>
                                <SelectItem value={RoleEnum.ENSEIGNANT}>Enseignant Chercheur</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as RequestStatus)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={RequestStatus.APPROVED}>Approuvé</SelectItem>
                                <SelectItem value={RequestStatus.PENDING}>En attente</SelectItem>
                                <SelectItem value={RequestStatus.REJECTED}>Rejeté</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                {/* Section des demandes d'adhésion */}
                <Card className="mb-6">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <div>
                                <CardTitle>Demandes d'adhésion ({filteredRequests.length})</CardTitle>
                                <CardDescription>Liste des demandes d'adhésion au laboratoire</CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => exportToCSV('requests')}
                                    disabled={filteredRequests.length === 0}
                                >
                                    <FileDown className="h-4 w-4 mr-2" />
                                    Exporter CSV
                                </Button>
                                <Tabs value={activeTab} onValueChange={setActiveTab}>
                                    <TabsList>
                                        <TabsTrigger value="all">Tous</TabsTrigger>
                                        <TabsTrigger value={RoleEnum.DOCTORANT}>Doctorants</TabsTrigger>
                                        <TabsTrigger value={RoleEnum.MASTER}>Masters</TabsTrigger>
                                        <TabsTrigger value={RoleEnum.ENSEIGNANT}>Enseignants</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Statistiques des demandes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Demandes par statut
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-2 flex-wrap">
                                        <Badge variant="outline" className="bg-yellow-50">
                                            En attente: {requestStatusCounts.pending}
                                        </Badge>
                                        <Badge variant="outline" className="bg-green-50">
                                            Approuvées: {requestStatusCounts.approved}
                                        </Badge>
                                        <Badge variant="outline" className="bg-red-50">
                                            Rejetées: {requestStatusCounts.rejected}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Demandes par rôle
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-2 flex-wrap">
                                        <Badge variant="outline" className="bg-blue-50">
                                            Doctorants: {requestRoleCounts[RoleEnum.DOCTORANT]}
                                        </Badge>
                                        <Badge variant="outline" className="bg-purple-50">
                                            Masters: {requestRoleCounts[RoleEnum.MASTER]}
                                        </Badge>
                                        <Badge variant="outline" className="bg-cyan-50">
                                            Enseignants: {requestRoleCounts[RoleEnum.ENSEIGNANT]}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {isLoading ? (
                            <div className="space-y-3">
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-20 w-full" />
                            </div>
                        ) : (
                            <DataTableMembersAddRequest
                                columns={requestMember}
                                data={filteredRequests}
                                onRefresh={fetchMembers}
                                isLoading={isLoading}
                            />
                        )}
                    </CardContent>
                    <CardFooter className="text-sm text-muted-foreground">
                        Dernière mise à jour: {new Date().toLocaleString()}
                    </CardFooter>
                </Card>

                {/* Section des membres */}
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <div>
                                <CardTitle>Membres ({filteredMembers.length})</CardTitle>
                                <CardDescription>Liste des membres du laboratoire</CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => exportToCSV('members')}
                                    disabled={filteredMembers.length === 0}
                                >
                                    <FileDown className="h-4 w-4 mr-2" />
                                    Exporter CSV
                                </Button>
                                <Button variant="secondary" size="sm">
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Ajouter un membre
                                </Button>
                                <Tabs value={activeTab} onValueChange={setActiveTab}>
                                    <TabsList>
                                        <TabsTrigger value="all">Tous</TabsTrigger>
                                        <TabsTrigger value={RoleEnum.DOCTORANT}>Doctorants</TabsTrigger>
                                        <TabsTrigger value={RoleEnum.MASTER}>Masters</TabsTrigger>
                                        <TabsTrigger value={RoleEnum.ENSEIGNANT}>Enseignants</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Statistiques des membres */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">


                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Membres par rôle
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-2 flex-wrap">
                                        <Badge variant="outline" className="bg-blue-50">
                                            Doctorants: {memberRoleCounts[RoleEnum.DOCTORANT]}
                                        </Badge>
                                        <Badge variant="outline" className="bg-purple-50">
                                            Masters: {memberRoleCounts[RoleEnum.MASTER]}
                                        </Badge>
                                        <Badge variant="outline" className="bg-cyan-50">
                                            Enseignants: {memberRoleCounts[RoleEnum.ENSEIGNANT]}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {isLoading ? (
                            <div className="space-y-3">
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-20 w-full" />
                            </div>
                        ) : (
                            <DataTableMembers
                                columns={membersColumns}
                                data={filteredMembers}
                                onRefresh={fetchMembers}
                                isLoading={isLoading}
                            />
                        )}
                    </CardContent>
                    <CardFooter className="text-sm text-muted-foreground">
                        Dernière mise à jour: {new Date().toLocaleString()}
                    </CardFooter>
                </Card>
            </main>
        </div>
    );
};

export default Members;
