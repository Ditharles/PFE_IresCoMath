import { Card, CardContent } from "../components/ui/card";
import { KeyRound, Bell, Settings as SettingsIcon } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import PreferencesSection from "../components/dashboard/settings/preferences";
import NotificationsSection from "../components/dashboard/settings/notifications";
import SecuritySection from "../components/dashboard/settings/security";

const Settings = () => {
    const { page = "preferences" } = useParams();
    const navigate = useNavigate();

    const sections = [
        {
            id: "preferences",
            title: "Préférences utilisateur",
            icon: SettingsIcon,
            component: PreferencesSection
        },
        {
            id: "notifications",
            title: "Notifications",
            icon: Bell,
            component: NotificationsSection
        },
        {
            id: "securite",
            title: "Sécurité et confidentialité",
            icon: KeyRound,
            component: SecuritySection
        },
    ];

    const ActiveComponent = sections.find(s => s.id === page)?.component || PreferencesSection;

    return (
        <div className="container mx-auto h-full">
            <Card className="overflow-hidden border-none shadow-lg h-full py-0">
                <CardContent className="p-0 h-full">
                    <div className="flex h-full">
                        {/* Sidebar à gauche */}
                        <div className="w-72 shrink-0 border-r bg-muted/40 h-full">
                            <div className="h-full flex flex-col p-4">
                                <h2 className="mb-6 text-xl font-bold tracking-tight">Paramètres</h2>
                                <nav className="space-y-2 flex-1">
                                    {sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => navigate(`/parametres/${section.id}`)}
                                            className={cn(
                                                "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                                                "hover:bg-muted/80 hover:text-foreground",
                                                page === section.id
                                                    ? "bg-primary text-primary-foreground"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            <section.icon className="h-4 w-4" />
                                            <span>{section.title}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Contenu principal à droite */}
                        <div className="flex-1 p-6 h-full">
                            <div className="space-y-6">
                                <ActiveComponent />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Settings;