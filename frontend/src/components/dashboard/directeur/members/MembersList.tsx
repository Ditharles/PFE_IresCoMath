import { useMemo } from "react";
import { FileDown, UserPlus } from "lucide-react";
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
import { columns as membersColumns } from "./columns"
import { RoleEnum } from "../../../../types/common";
import { User } from "../../../../types/Member";

const MembersList = ({
    members,
    isLoading,
    onRefresh,
    exportToCSV,
}: {
    members: User[],
    isLoading: boolean,
    onRefresh?: () => void,
    exportToCSV: () => void,
}) => {
    // Calcul des statistiques des rôles pour les membres
    const memberRoleCounts = useMemo(() => {
        const determineRole = (user: User) => {
            if ("thesisYear" in user) return RoleEnum.DOCTORANT;
            if ("masterYear" in user) return RoleEnum.MASTER;
            if ("position" in user) return RoleEnum.ENSEIGNANT;
            return RoleEnum.ADMIN;
        };

        return {
            [RoleEnum.DOCTORANT]: members.filter(m => determineRole(m) === RoleEnum.DOCTORANT).length,
            [RoleEnum.MASTER]: members.filter(m => determineRole(m) === RoleEnum.MASTER).length,
            [RoleEnum.ENSEIGNANT]: members.filter(m => determineRole(m) === RoleEnum.ENSEIGNANT).length
        };
    }, [members]);

    return (
        <Card >
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                        <CardTitle>Membres ({members.length})</CardTitle>
                        <CardDescription>Liste des membres du laboratoire</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => exportToCSV()}
                            disabled={members.length === 0}
                        >
                            <FileDown className="h-4 w-4 mr-2" />
                            Exporter CSV
                        </Button>
                        <Button variant="secondary" size="sm">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Ajouter un membre
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {/* Statistiques des membres */}
                <div className="bg-primary grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Card className=" text-primary-foreground">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                                Membres par rôle
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2 flex-wrap">
                                <Badge variant="outline" className=" text-secondary-foreground">
                                    Doctorants: {memberRoleCounts[RoleEnum.DOCTORANT]}
                                </Badge>
                                <Badge variant="outline" className="text-secondary-foreground">
                                    Masters: {memberRoleCounts[RoleEnum.MASTER]}
                                </Badge>
                                <Badge variant="outline" className="text-secondary-foreground">
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
                    <BaseDataTable
                        columns={membersColumns}
                        data={members}
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

export default MembersList;