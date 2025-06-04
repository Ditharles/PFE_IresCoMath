import { BellIcon, UserIcon } from "lucide-react"
import { getUser } from "../../utils/tokens.utils"
import { useEffect, useState } from "react"
import NotificationsService from "../../services/notifcations.service"
import { ModeToggle } from "../ui/mode-toogle"
import logoIres from "../../assets/logo-ires.png"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { SearchCommand } from "./SearchCommand"

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
        <header className="fixed top-0 left-0 w-full z-50 shadow-sm py-3 px-6 flex items-center justify-between bg-background text-foreground border-b border-border">
            <div className="flex items-center">
                <img
                    src={logoIres}
                    alt="logo"
                    className="h-10 object-contain rounded-lg"
                />
            </div>

            <div className="flex items-center space-x-4">
                <SearchCommand
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleNotifications}
                    className="relative"
                >
                    <BellIcon className="h-6 w-6" />
                    {unreadNotificationsCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center"
                        >
                            {unreadNotificationsCount}
                        </Badge>
                    )}
                </Button>

                <ModeToggle />

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleUserProfile}
                    className="relative"
                >
                    <Avatar>
                        {user.photo ? (
                            <AvatarImage src={user.photo} alt={user.name} />
                        ) : (
                            <AvatarFallback>
                                {user.name ? (
                                    user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
                                ) : (
                                    <UserIcon className="h-6 w-6" />
                                )}
                            </AvatarFallback>
                        )}
                    </Avatar>
                </Button>
            </div>
        </header>
    )
}

export default Header