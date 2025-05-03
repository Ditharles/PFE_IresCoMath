import { ReactNode, useState } from "react";

import Header from "./Header";
import SidebarDirector from "../dashboard/directeur/Sidebar";
import  SidebarOthers  from "./others/Sidebar";

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
    const [darkMode, setDarkMode] = useState(false);
    const [showUserProfile, setShowUserProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className={`flex flex-col min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"} text-gray-900`}>

            {/* Header fixé tout en haut */}
            <div className="fixed top-0 left-0 right-0 z-50 h-16">
                <Header
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    showUserProfile={showUserProfile}
                    setShowUserProfile={setShowUserProfile}
                    showNotifications={showNotifications}
                    setShowNotifications={setShowNotifications}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </div>


            <div className="flex flex-1 pt-16">


                <div className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] z-40 border-r bg-white dark:bg-gray-800 shadow-lg">
                    {role === "DIRECTEUR" ? <SidebarDirector darkMode={darkMode} /> : <SidebarOthers darkMode={darkMode} />}
                </div>


                <main className="ml-64 flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
            {/* Panneau latéral de profil utilisateur */}
            {showUserProfile && <UserProfile darkMode={darkMode} onClose={() => setShowUserProfile(false)} />}

            {/* Panneau latéral de notifications */}
            {showNotifications && <NotificationsPanel darkMode={darkMode} onClose={() => setShowNotifications(false)} />}

        </div>
    );
};

export default Layout;
