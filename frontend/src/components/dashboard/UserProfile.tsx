
import { useEffect, useState } from "react"
import {
  XMarkIcon,
  PencilIcon,
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline"
import AuthService from "../../services/auth.service"
import { useNavigate } from "react-router-dom"

interface UserProfileProps {
  darkMode: boolean
  onClose: () => void
  user?: {
    name: string
    email: string
    role: string
    profileImage?: string
  }
}

const UserProfile: React.FC<UserProfileProps> = ({ darkMode, onClose, user = defaultUser }) => {
  const [isVisible, setIsVisible] = useState(false)

  const navigate = useNavigate()
  // Animation d'entrée
  useEffect(() => {
    // Petit délai pour permettre au DOM de se mettre à jour avant l'animation
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10)

    return () => clearTimeout(timer)
  }, [])

  // Gestion de la fermeture avec animation
  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300) // Durée de l'animation de sortie
  }
  const authService = new AuthService()
  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Une erreur s'est produite lors de la déconnexion:", error);
    } finally {
      navigate("/");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={handleClose}>
      {/* Overlay semi-transparent */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${isVisible ? "opacity-30" : "opacity-0"
          }`}
      />

      {/* Panneau latéral */}
      <div
        className={`relative w-full max-w-md h-full ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
          } shadow-xl transition-transform duration-300 ease-in-out ${isVisible ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête du panneau */}
        <div
          className={`flex items-center justify-between p-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"
            }`}
        >
          <h2 className="text-xl font-semibold">Profil utilisateur</h2>
          <button
            onClick={handleClose}
            className={`p-1.5 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
            aria-label="Fermer"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Contenu du panneau */}
        <div className="h-full overflow-y-auto">
          {/* Section profil */}
          <div className="flex flex-col items-center p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="relative mb-4">
              {user.profileImage ? (
                <div className="relative">
                  <img
                    src={user.profileImage || "/placeholder.svg"}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                  />
                  <button
                    className={`absolute bottom-0 right-0 p-1.5 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                      }`}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                >
                  <UserIcon className="w-12 h-12 text-gray-500" />
                </div>
              )}
            </div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{user.email}</p>
            <span
              className={`mt-2 px-3 py-1 text-xs rounded-full ${darkMode ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-800"
                }`}
            >
              {user.role}
            </span>
          </div>

          {/* Section compte */}
          <div className="p-4">
            <h3
              className={`text-xs font-semibold uppercase tracking-wider mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              COMPTE
            </h3>
            <div className="space-y-1">
              <ProfileOption
                icon={<UserIcon className="w-5 h-5" />}
                label="Modifier mon profil"
                description="Modifier vos informations personnelles"
                darkMode={darkMode}
              />
              <ProfileOption
                icon={<ShieldCheckIcon className="w-5 h-5" />}
                label="Sécurité"
                description="Gérer votre mot de passe et la sécurité du compte"
                darkMode={darkMode}
              />
              <ProfileOption
                icon={<BellIcon className="w-5 h-5" />}
                label="Notifications"
                description="Gérer vos préférences de notifications"
                darkMode={darkMode}
              />
            </div>
          </div>

          {/* Section préférences */}
          <div className="p-4">
            <h3
              className={`text-xs font-semibold uppercase tracking-wider mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              PRÉFÉRENCES
            </h3>
            <div className="space-y-1">
              <ProfileOption
                icon={<Cog6ToothIcon className="w-5 h-5" />}
                label="Paramètres"
                description="Personnaliser votre expérience"
                darkMode={darkMode}
              />
            </div>
          </div>

          {/* Section déconnexion */}
          <div className="p-4 mt-auto">
            <button
              className={`w-full flex items-center p-3 rounded-lg ${darkMode ? "text-red-300 hover:bg-red-900 hover:bg-opacity-30" : "text-red-600 hover:bg-red-50"}`}
              onClick={() => handleLogout()}
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className={darkMode ? "text-red-300" : "text-red-600"}>Se déconnecter</div>
              </div>
            </button>
          </div>

          {/* Pied de page */}
          <div className={`p-4 text-xs text-center ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            Dernière connexion: Aujourd'hui à 10:45
          </div>
        </div>
      </div>
    </div>
  )
}

const ProfileOption: React.FC<{
  icon: React.ReactNode
  label: string
  description?: string
  darkMode: boolean
  danger?: boolean
}> = ({ icon, label, description, darkMode, danger = false }) => {
  return (
    <button
      className={`w-full flex items-center p-3 rounded-lg ${danger
        ? darkMode
          ? "text-red-300 hover:bg-red-900 hover:bg-opacity-30"
          : "text-red-600 hover:bg-red-50"
        : darkMode
          ? "hover:bg-gray-700"
          : "hover:bg-gray-100"
        }`}
    >
      <span className="mr-3">{icon}</span>
      <div className="text-left">
        <div className={danger ? (darkMode ? "text-red-300" : "text-red-600") : ""}>{label}</div>
        {description && <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{description}</div>}
      </div>
    </button>
  )
}

// Données utilisateur par défaut
const defaultUser = {
  name: "Mohamed Amine",
  email: "mohamed.amine@example.com",
  role: "Doctorant",
  profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
}

export default UserProfile
