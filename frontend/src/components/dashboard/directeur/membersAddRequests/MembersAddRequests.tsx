import { useMemo } from "react";
import { FileDown } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Skeleton } from "../../../ui/skeleton";
import { Badge } from "../../../ui/badge";
import { BaseDataTable } from "../../BaseDataTable";
import { columns as requestMember } from "./columns";
import { RoleEnum } from "../../../../types/common";
import { RequestStatus, RequestUser } from "../../../../types/MemberAddRequest";

interface MembersAddRequestsListProps {
    requests: RequestUser[];
    isLoading: boolean;
    onRefresh: () => void;
    exportToCSV: (type: string) => void;
}

const MembersAddRequestsList = ({
    requests,
    isLoading,
    onRefresh,
    exportToCSV
}: MembersAddRequestsListProps) => {
    // Calcul des statistiques pour les demandes
    const requestStatusCounts = useMemo(() => {
        return {
            pending: requests.filter((m: RequestUser) => m.status === RequestStatus.PENDING).length,
            approved: requests.filter((m: RequestUser) => m.status === RequestStatus.APPROVED || m.status === RequestStatus.APPROVED_BY_DIRECTOR).length,
            rejected: requests.filter((m: RequestUser) => m.status === RequestStatus.REJECTED || m.status === RequestStatus.REJECTED_BY_DIRECTOR).length,
            completed: requests.filter((m: RequestUser) => m.status === RequestStatus.COMPLETED).length,
            closed: requests.filter((m: RequestUser) => m.status === RequestStatus.CLOSED).length
        };
    }, [requests]);

    // Calcul des statistiques des rôles pour les demandes
    const requestRoleCounts = useMemo(() => {
        const determineRole = (user: RequestUser) => {
            if ("thesisYear" in user) return RoleEnum.DOCTORANT;
            if ("masterYear" in user) return RoleEnum.MASTER;
            if ("position" in user) return RoleEnum.ENSEIGNANT;
            return RoleEnum.ADMIN;
        };

        return {
            [RoleEnum.DOCTORANT]: requests.filter((m: RequestUser) => determineRole(m) === RoleEnum.DOCTORANT).length,
            [RoleEnum.MASTER]: requests.filter((m: RequestUser) => determineRole(m) === RoleEnum.MASTER).length,
            [RoleEnum.ENSEIGNANT]: requests.filter((m: RequestUser) => determineRole(m) === RoleEnum.ENSEIGNANT).length
        };
    }, [requests]);

    return (
        <Card className="mb-6">
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                        <CardTitle>Demandes d'adhésion ({requests.length})</CardTitle>
                        <CardDescription>Liste des demandes d'adhésion au laboratoire</CardDescription>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportToCSV('requests')}
                        disabled={requests.length === 0}
                    >
                        <FileDown className="h-4 w-4 mr-2" />
                        Exporter CSV
                    </Button>
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
                                <Badge variant="outline" className="bg-amber-50/50 dark:bg-amber-900/30 text-amber-900/70 dark:text-amber-400">
                                    En attente: {requestStatusCounts.pending}
                                </Badge>
                                <Badge variant="outline" className="bg-emerald-50/50 dark:bg-emerald-900/30 text-emerald-900/70 dark:text-emerald-400">
                                    Approuvées: {requestStatusCounts.approved}
                                </Badge>
                                <Badge variant="outline" className="bg-rose-50/50 dark:bg-rose-900/30 text-rose-900/70 dark:text-rose-400">
                                    Rejetées: {requestStatusCounts.rejected}
                                </Badge>
                                <Badge variant="outline" className="bg-blue-50/50 dark:bg-blue-900/30 text-blue-900/70 dark:text-blue-400">
                                    Completées: {requestStatusCounts.completed}
                                </Badge>
                                <Badge variant="outline" className="bg-gray-50/50 dark:bg-gray-800 text-gray-900/70 dark:text-gray-400">
                                    Cloturés: {requestStatusCounts.closed}
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
                                <Badge variant="outline" className="bg-indigo-50/50 dark:bg-indigo-900/30 text-indigo-900/70 dark:text-indigo-400">
                                    Doctorants: {requestRoleCounts[RoleEnum.DOCTORANT]}
                                </Badge>
                                <Badge variant="outline" className="bg-violet-50/50 dark:bg-violet-900/30 text-violet-900/70 dark:text-violet-400">
                                    Masters: {requestRoleCounts[RoleEnum.MASTER]}
                                </Badge>
                                <Badge variant="outline" className="bg-cyan-50/50 dark:bg-cyan-900/30 text-cyan-900/70 dark:text-cyan-400">
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
                    <BaseDataTable
                        columns={requestMember(onRefresh)}
                        data={requests}
                        onRefresh={onRefresh}
                        isLoading={isLoading}
                    />
                )}
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
                Dernière mise à jour: {new Date().toLocaleString()}
            </CardFooter>
        </Card>
    );
};

export default MembersAddRequestsList;