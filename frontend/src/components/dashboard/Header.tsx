import { BellIcon, MoonIcon, SunIcon } from "lucide-react"
import { getUser } from "../../utils/tokens.utils"

interface HeaderProps {

    darkMode?: boolean
    setDarkMode: (darkMode: boolean) => void
    showUserProfile: boolean
    setShowUserProfile: (showUserProfile: boolean) => void
    showNotifications: boolean
    setShowNotifications: (showNotifications: boolean) => void
    searchQuery: string
    setSearchQuery: (searchQuery: string) => void
}


export const Header = ({ darkMode, setDarkMode, showUserProfile, setShowUserProfile, showNotifications, setShowNotifications, searchQuery, setSearchQuery }: HeaderProps) => {

    const user = getUser();
    const unreadNotificationsCount = 2
    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

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
            className={`shadow-sm py-4 px-6 flex justify-between items-center ${darkMode ? "bg-gray-800" : "bg-white"}`}
        >
            <h1 className="text-2xl font-bold">LOGO</h1>
            <div className="flex items-center space-x-4">
                <div className={`relative ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className={`pl-10 pr-4 py-2 rounded-md ${darkMode ? "bg-gray-700 border-gray-600" : "border-gray-300"} border`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg
                        className="absolute left-3 top-2.5 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
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
                    className={`relative p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    aria-label="Notifications"
                >
                    <BellIcon className="h-6 w-6" />
                    {unreadNotificationsCount > 0 && (
                        <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                            {unreadNotificationsCount}
                        </span>
                    )}
                </button>

                <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-full ${darkMode ? "text-yellow-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                </button>

                {/* Bouton de profil utilisateur */}
                <button
                    onClick={toggleUserProfile}
                    className={`relative overflow-hidden rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    aria-label="User profile"
                >
                    {user.photo ? (
                        <img
                            src={user.photo || "/placeholder.svg"}
                            alt={user.name}
                            className="h-10 w-10 rounded-full object-cover border-2 border-transparent hover:border-blue-500 transition-all"
                        />
                    ) : (
                        <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"
                                }`}
                        >
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
                        </div>
                    )}

                    {/* Indicateur de notification (optionnel) */}
                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>
            </div>
        </header>
    )
}

export default Header