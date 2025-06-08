import { Bell, UserPlus, FileCheck, UserX, CheckCircle, XCircle, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";
import { Switch } from "../../ui/switch";
import { useAuth } from "../../../contexts/AuthContext";


const NotificationsSection = () => {
    const { user } = useAuth();

    const renderNotificationsByRole = () => {
        switch (user?.role) {
            case "DIRECTEUR":
                return (
                    <>
                        {/* Notifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="h-5 w-5" />
                                    Notifications Directeur
                                </CardTitle>
                                <CardDescription>
                                    Gérez vos notifications en tant que directeur
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="flex items-center gap-2">
                                            <UserPlus className="h-4 w-4" />
                                            Nouvelles demandes d'adhésion
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Soyez notifié lors de nouvelles demandes d'adhésion
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="flex items-center gap-2">
                                            <FileCheck className="h-4 w-4" />
                                            Soumission de nouvelles demandes
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Recevez des notifications pour les nouvelles soumissions
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4" />
                                            Complétion des demandes
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Soyez informé lorsque les utilisateurs complètent leurs demandes
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Email */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Mail className="h-5 w-5" />
                                    Email Directeur
                                </CardTitle>
                                <CardDescription>
                                    Gérez vos notifications par email en tant que directeur
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="flex items-center gap-2">
                                            <UserPlus className="h-4 w-4" />
                                            Nouvelles demandes d'adhésion
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Recevez un email lors de nouvelles demandes d'adhésion
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="flex items-center gap-2">
                                            <FileCheck className="h-4 w-4" />
                                            Soumission de nouvelles demandes
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Recevez un email pour les nouvelles soumissions
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4" />
                                            Complétion des demandes
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Recevez un email lorsque les utilisateurs complètent leurs demandes
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>
                    </>
                );

            case "ADMIN":
                return (
                    <>
                        {/* Notifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="h-5 w-5" />
                                    Notifications Admin
                                </CardTitle>
                                <CardDescription>
                                    Gérez vos notifications en tant qu'administrateur
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="flex items-center gap-2">
                                            <UserX className="h-4 w-4" />
                                            Désactivation d'utilisateur
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Recevez des notifications lors de la désactivation d'un utilisateur
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Email */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Mail className="h-5 w-5" />
                                    Email Admin
                                </CardTitle>
                                <CardDescription>
                                    Gérez vos notifications par email en tant qu'administrateur
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="flex items-center gap-2">
                                            <UserX className="h-4 w-4" />
                                            Désactivation d'utilisateur
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Recevez un email lors de la désactivation d'un utilisateur
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>
                    </>
                );

            case "MASTER":
            case "DOCTORANT":
                return (
                    <>
                        {/* Notifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="h-5 w-5" />
                                    Notifications {user.role}
                                </CardTitle>
                                <CardDescription>
                                    Gérez vos notifications en tant que {user.role.toLowerCase()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4" />
                                            Validation de requête
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Soyez notifié lors de la validation de vos requêtes
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="flex items-center gap-2">
                                            <XCircle className="h-4 w-4" />
                                            Clôture de requête
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Recevez des notifications lors de la clôture de vos requêtes
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Email */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Mail className="h-5 w-5" />
                                    Email {user.role}
                                </CardTitle>
                                <CardDescription>
                                    Gérez vos notifications par email en tant que {user.role.toLowerCase()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4" />
                                            Validation de requête
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Recevez un email lors de la validation de vos requêtes
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="flex items-center gap-2">
                                            <XCircle className="h-4 w-4" />
                                            Clôture de requête
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Recevez un email lors de la clôture de vos requêtes
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {renderNotificationsByRole()}
        </div>
    );
};

export default NotificationsSection;
