import { KeyRound, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import AuthService from "../../../services/auth.service";

interface Session {
    id: string;
    browserName: string;
    browserVersion: string;
    ipAddress: string;
    createdAt: string;
    isCurrentSession: boolean;
}

const SecuritySection = () => {
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSessions, setIsLoadingSessions] = useState(false);
    const [deletingSessionId, setDeletingSessionId] = useState<string | null>(null);
    const authService = new AuthService();

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        setIsLoadingSessions(true);
        try {
            const sessionsData = await authService.getUserSessions();
            setSessions(sessionsData);
        } catch (error) {
            toast.error("Erreur lors de la récupération des sessions");
            console.error(error);
        } finally {
            setIsLoadingSessions(false);
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswords(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordUpdate = async () => {
        // Validation des champs
        if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
            toast.error("Veuillez remplir tous les champs");
            return;
        }

        // Validation de la correspondance des mots de passe
        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas");
            return;
        }

        // Validation de la longueur minimale
        if (passwords.newPassword.length < 8) {
            toast.error("Le mot de passe doit contenir au moins 8 caractères");
            return;
        }

        setIsLoading(true);
        try {
            await authService.updatePassword({
                oldPassword: passwords.currentPassword,
                newPassword: passwords.newPassword
            });

            toast.success("Votre mot de passe a été mis à jour avec succès");

            // Réinitialiser les champs
            setPasswords({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        } catch {
            toast.error("Une erreur est survenue lors de la mise à jour du mot de passe");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogoutSession = async (sessionId: string) => {
        setDeletingSessionId(sessionId);
        try {
            await authService.logoutSession(sessionId);
            toast.success("Session déconnectée avec succès");
            // Rafraîchir la liste des sessions
            await fetchSessions();
        } catch (error) {
            toast.error("Erreur lors de la déconnexion de la session");
            console.error(error);
        } finally {
            setDeletingSessionId(null);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            dateStyle: 'medium',
            timeStyle: 'short'
        }).format(date);
    };

    return (
        <div className="space-y-6">
            {/* Changement de mot de passe */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <KeyRound className="h-5 w-5" />
                        Mot de passe
                    </CardTitle>
                    <CardDescription>
                        Modifiez votre mot de passe pour maintenir la sécurité de votre compte
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Mot de passe actuel</Label>
                        <Input
                            id="current-password"
                            name="currentPassword"
                            type="password"
                            value={passwords.currentPassword}
                            onChange={handlePasswordChange}
                            placeholder="Entrez votre mot de passe actuel"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">Nouveau mot de passe</Label>
                        <Input
                            id="new-password"
                            name="newPassword"
                            type="password"
                            value={passwords.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="Entrez votre nouveau mot de passe"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                        <Input
                            id="confirm-password"
                            name="confirmPassword"
                            type="password"
                            value={passwords.confirmPassword}
                            onChange={handlePasswordChange}
                            placeholder="Confirmez votre nouveau mot de passe"
                        />
                    </div>
                    <Button
                        className="w-full"
                        onClick={handlePasswordUpdate}
                        disabled={isLoading}
                    >
                        {isLoading ? "Mise à jour..." : "Mettre à jour le mot de passe"}
                    </Button>
                </CardContent>
            </Card>

            {/* Sessions actives */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Sessions actives
                    </CardTitle>
                    <CardDescription>
                        Gérez vos sessions de connexion actives
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isLoadingSessions ? (
                        <div className="text-center py-4">Chargement des sessions...</div>
                    ) : sessions.length === 0 ? (
                        <div className="text-center py-4">Aucune session active</div>
                    ) : (
                        sessions.map((session, index) => (
                            <div key={session.id}>
                                {index > 0 && <Separator className="my-4" />}
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>
                                            {session.isCurrentSession ? "Session actuelle" : "Session"}
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            {session.browserName} {session.browserVersion} - {session.ipAddress}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Connecté le {formatDate(session.createdAt)}
                                        </p>
                                    </div>
                                    {!session.isCurrentSession && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleLogoutSession(session.id)}
                                            disabled={deletingSessionId === session.id}
                                        >
                                            {deletingSessionId === session.id ? "Déconnexion..." : "Déconnecter"}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default SecuritySection;
