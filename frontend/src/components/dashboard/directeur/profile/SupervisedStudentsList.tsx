import { User } from "../../../../types/Member";
import { useEffect, useState } from "react";
import { ManageUserService } from "../../../../services/manageUser.service";
import { BaseDataTable } from "../../BaseDataTable";
import { columns } from "../members/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";
import { GraduationCap } from "lucide-react";
import { Card, CardContent } from "../../../ui/card";
import { toast } from "sonner";

interface SupervisedStudentsListProps {
    supervisorId: string;
    title: string;
    isLoading?: boolean;
}

const SupervisedStudentsList = ({ supervisorId, title, isLoading = false }: SupervisedStudentsListProps) => {
    const [masterStudents, setMasterStudents] = useState<User[]>([]);
    const [doctoralStudents, setDoctoralStudents] = useState<User[]>([]);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);
    const manageUserService = new ManageUserService();

    useEffect(() => {
        const fetchStudents = async () => {
            setIsLoadingDetails(true);
            try {
                const response = await manageUserService.getStudents(supervisorId);
                console.log("Réponse de l'API:", response);

                if (!response.data) {
                    console.error("Pas de données dans la réponse");
                    return;
                }

                const students = response.data;
                console.log("Étudiants reçus:", students);

                // Filtrer les étudiants par type
                const masters = students.filter((student: User) => student.role === "MASTER");
                const doctorants = students.filter((student: User) => student.role === "DOCTORANT");

                console.log("Masters:", masters);
                console.log("Doctorants:", doctorants);

                setMasterStudents(masters);
                setDoctoralStudents(doctorants);
            } catch (error) {
                console.error("Erreur lors de la récupération des étudiants:", error);
                toast.error("Erreur lors de la récupération des étudiants");
            } finally {
                setIsLoadingDetails(false);
            }
        };

        if (supervisorId) {
            fetchStudents();
        }
    }, [supervisorId]);

    if (isLoading || isLoadingDetails) {
        return (
            <div className="space-y-4">
                <div className="bg-muted/50 animate-pulse rounded-lg h-8 w-full"></div>
                <div className="bg-muted/50 animate-pulse rounded-lg h-20 w-full"></div>
            </div>
        );
    }

    if (!masterStudents.length && !doctoralStudents.length) {
        return (
            <div className="text-center py-6 text-muted-foreground">
                Aucun étudiant trouvé
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <Tabs defaultValue="master" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="master" className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        Master ({masterStudents.length})
                    </TabsTrigger>
                    <TabsTrigger value="doctorat" className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        Doctorat ({doctoralStudents.length})
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="master">
                    <Card>
                        <CardContent className="pt-6">
                            <BaseDataTable
                                columns={columns}
                                data={masterStudents}
                                isLoading={isLoadingDetails}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="doctorat">
                    <Card>
                        <CardContent className="pt-6">
                            <BaseDataTable
                                columns={columns}
                                data={doctoralStudents}
                                isLoading={isLoadingDetails}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SupervisedStudentsList; 