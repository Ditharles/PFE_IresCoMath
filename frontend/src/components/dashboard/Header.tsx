import { BellIcon } from "lucide-react"
import { getUser } from "../../utils/tokens.utils"
import { useEffect, useState } from "react"
import NotificationsService from "../../services/notifcations.service"
import { ModeToggle } from "../ui/mode-toogle"

interface HeaderProps {
    showUserProfile: boolean
    setShowUserProfile: (showUserProfile: boolean) => void
    showNotifications: boolean
    setShowNotifications: (showNotifications: boolean) => void
    searchQuery: string
    setSearchQuery: (searchQuery: string) => void
}

export const Header = ({
    showUserProfile,
    setShowUserProfile,
    showNotifications,
    setShowNotifications,
    searchQuery,
    setSearchQuery
}: HeaderProps) => {
    const user = getUser();
    const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
    const notificationService = new NotificationsService();

    useEffect(() => {
        const fetchUnreadNotificationsCount = async () => {
            const count = await notificationService.getUnreadNumberNotifications();
            setUnreadNotificationsCount(count.data);
        };
        fetchUnreadNotificationsCount();
    }, [])

    const toggleUserProfile = () => {
        if (showNotifications) setShowNotifications(false)
        setShowUserProfile(!showUserProfile)
    }

    const toggleNotifications = () => {
        if (showUserProfile) setShowUserProfile(false)
        setShowNotifications(!showNotifications)
    }

    return (
        <header
            className="fixed top-0 left-0 w-full z-50 shadow-sm py-3 px-6 flex items-center justify-between bg-background text-foreground border-b border-border"
        >
            {/* Logo avec meilleur positionnement et taille */}
            <div className="flex items-center">
                <img
                    src="./src/assets/logo-ires.png"
                    alt="logo"
                    className="h-10 object-contain bg-card rounded-lg"
                />
            </div>

            <div className="flex items-center space-x-4">
                {/* Barre de recherche */}
                <div className="relative hidden md:block">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 rounded-md w-64 border focus:outline-none bg-input text-foreground border-border"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg
                        className="absolute left-3 top-2.5 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ color: "var(--muted-foreground)" }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                {/* Bouton de notifications */}
                <button
                    onClick={toggleNotifications}
                    className="relative p-2 rounded-full bg-card text-foreground hover:bg-muted focus:outline-none focus:ring-2"
                    aria-label="Notifications"
                >
                    <BellIcon className="h-6 w-6" />
                    {unreadNotificationsCount > 0 && (
                        <span className="absolute top-0 right-0 flex h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs items-center justify-center">
                            {unreadNotificationsCount > 9 ? "9+" : unreadNotificationsCount}
                        </span>
                    )}
                </button>

                {/* Ajout du mode toggle */}
                <ModeToggle />

                {/* Bouton de profil utilisateur */}
                <button
                    onClick={toggleUserProfile}
                    className="relative overflow-hidden rounded-full bg-card text-foreground focus:outline-none focus:ring-2"
                    aria-label="User profile"
                >
                    {user.photo ? (
                        <img
                            src={user.photo}
                            alt={user.name}
                            className="h-10 w-10 rounded-full object-cover border-2 border-transparent hover:border-primary transition-all"
                        />
                    ) : (
                        <div
                            className="h-10 w-10 rounded-full flex items-center justify-center bg-muted"
                        >
                            {user.name ? (
                                <span className="font-medium">
                                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </span>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            )}
                        </div>
                    )}
                </button>
            </div>
        </header>
    )
}

export default Header