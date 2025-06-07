import { ReactNode, useState } from "react";

import Header from "./Header";
import SidebarDirector from "../dashboard/directeur/Sidebar";
import SidebarOthers from "./others/Sidebar";
import AdminSidebar from "./admin/AdminSidebar";
import UserProfile from "./UserProfile";
import NotificationsPanel from "../NotificationsPanel";
import { useAuth } from "../../contexts/AuthContext";
// import Footer from "../Footer"; 
//TODO: add footer

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const { user } = useAuth();
  
    const role = user?.role;
    const [showUserProfile, setShowUserProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="flex flex-col min-h-screen bg-secondary text-foreground">
            {/* Header fixé tout en haut */}
            <div className="fixed top-0 left-0 right-0 z-50 h-16">
                <Header
                    showUserProfile={showUserProfile}
                    setShowUserProfile={setShowUserProfile}
                    showNotifications={showNotifications}
                    setShowNotifications={setShowNotifications}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </div>

            <div className="flex flex-1 pt-16">
                <div
                    className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] z-40 border-r bg-sidebar text-sidebar-foreground shadow-lg"
                    style={{
                        borderRight: "1px solid var(--sidebar-border)"
                    }}
                >
                    {/* Correction : test strict sur le rôle */}
                    {role === "DIRECTEUR" ? <SidebarDirector /> : role === "ADMIN" ? <AdminSidebar /> : <SidebarOthers />}
                </div>

                <main className="ml-64 flex-1 p-6 overflow-auto bg-secondary text-foreground">
                    {children}
                </main>
            </div>
            {/* Panneau latéral de profil utilisateur */}
            {showUserProfile && <UserProfile onClose={() => setShowUserProfile(false)} />}

            {/* Panneau latéral de notifications */}
            {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}

        </div>
    );
};

export default Layout;
