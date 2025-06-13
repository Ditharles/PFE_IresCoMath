import { useMemo } from "react";
import { FileDown, UserPlus, Users } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "../../../ui/card";
import { Button } from "../../../ui/button";
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
        console.log(members);
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
        <Card className=" shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="border-b border-border/40 ">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold tracking-tight">
                                Membres ({members.length})
                            </CardTitle>
                            <CardDescription className="text-muted-foreground/80">
                                Liste des membres du laboratoire
                            </CardDescription>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => exportToCSV()}
                            disabled={members.length === 0}
                            className="hover:bg-primary/10 hover:text-primary transition-colors">
                            <FileDown className="h-4 w-4 mr-2" />
                            Exporter CSV
                        </Button>
                        <Button
                            variant="default"
                            size="sm"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow transition-all">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Ajouter un membre
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                {/* Section Statistiques */}
                <section>
                    <Card className="bg-card/50 backdrop-blur-sm border-border/40 shadow-sm hover:shadow-md transition-all duration-300">
                        <CardHeader className="pb-3 border-b border-border/40">
                            <CardTitle className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                Répartition des membres
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="flex flex-wrap gap-3">
                                <Badge
                                    variant="secondary"
                                    className="bg-secondary/80 backdrop-blur-sm text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 border border-border/40 px-4 py-2 rounded-full shadow-sm hover:shadow">
                                    <span className="font-medium">Doctorants:</span>
                                    <span className="ml-2 font-bold text-primary">
                                        {memberRoleCounts[RoleEnum.DOCTORANT]}
                                    </span>
                                </Badge>
                                <Badge
                                    variant="secondary"
                                    className="bg-secondary/80 backdrop-blur-sm text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 border border-border/40 px-4 py-2 rounded-full shadow-sm hover:shadow">
                                    <span className="font-medium">Masters:</span>
                                    <span className="ml-2 font-bold text-primary">
                                        {memberRoleCounts[RoleEnum.MASTER]}
                                    </span>
                                </Badge>
                                <Badge
                                    variant="secondary"
                                    className="bg-secondary/80 backdrop-blur-sm text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 border border-border/40 px-4 py-2 rounded-full shadow-sm hover:shadow">
                                    <span className="font-medium">Enseignants:</span>
                                    <span className="ml-2 font-bold text-primary">
                                        {memberRoleCounts[RoleEnum.ENSEIGNANT]}
                                    </span>
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Section Table des données */}
                <section>
                    {isLoading ? (
                        <div className="space-y-4">
                            <div className="bg-muted/50 animate-pulse rounded-lg h-8 w-full"></div>
                            <div className="bg-muted/50 animate-pulse rounded-lg h-20 w-full"></div>
                            <div className="bg-muted/50 animate-pulse rounded-lg h-20 w-full"></div>
                        </div>
                    ) : (
                        <div className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                            <BaseDataTable
                                columns={membersColumns({
                                    onUpdate: onRefresh as () => void,
                                })}
                                data={members}
                                onRefresh={onRefresh}
                                isLoading={isLoading}
                            />
                        </div>
                    )}
                </section>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground/80 border-t border-border/40 bg-muted/30">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-pulse"></div>
                    Dernière mise à jour: {new Date().toLocaleString()}
                </div>
            </CardFooter>
        </Card>
    );
};

export default MembersList;