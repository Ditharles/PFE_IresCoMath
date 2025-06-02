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

import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { toast } from "sonner"
import { AxiosResponse } from "axios"


interface UserProfileProps {
  onClose: () => void
}

const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Animation d'entrée
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }
  console.log(user);
  const handleLogout = async () => {
    try {
      const response = await logout()
      const data = (response as AxiosResponse).data as { message: string }
      toast.success(data.message)
    } catch (error) {
      console.error("Une erreur s'est produite lors de la déconnexion:", error)
    } finally {
      setIsVisible(false)
      setTimeout(() => {
        navigate("/")
      }, 100)
    }
  }
  const ProfileOption: React.FC<{
    icon: React.ReactNode
    label: string
    description?: string
    danger?: boolean
  }> = ({ icon, label, description, danger = false }) => {
    return (
      <button
        className={`w-full flex items-center p-3 rounded-lg ${danger
          ? "text-destructive hover:bg-destructive/10"
          : "hover:bg-muted"
          }`}
      >
        <span className="mr-3">{icon}</span>
        <div className="text-left">
          <div className={danger ? "text-destructive" : ""}>{label}</div>
          {description && (
            <div className="text-xs text-muted-foreground">
              {description}
            </div>
          )}
        </div>
      </button>
    )
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
        className={`relative w-full max-w-md h-full bg-background text-foreground shadow-xl transition-transform duration-300 ease-in-out ${isVisible ? "translate-x-0" : "translate-x-full"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête du panneau */}
        <div
          className="flex items-center justify-between p-4 border-b border-border"
        >
          <h2 className="text-xl font-semibold">Profil utilisateur</h2>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-muted"
            aria-label="Fermer"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Contenu du panneau */}
        <div className="h-full overflow-y-auto">
          {/* Section profil */}
          <div className="flex flex-col items-center p-6 border-b border-border">
            <div className="relative mb-4">
              {

                user.photo ? (
                  <div className="relative">
                    <img
                      src={user.photo || "/placeholder.svg"}
                      alt={user.name}
                      className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                    />
                    <button
                      className="absolute bottom-0 right-0 p-1.5 rounded-full bg-muted hover:bg-muted/70"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center bg-muted"
                  >
                    <UserIcon className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
            </div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">
              {user.email}
            </p>
            <span
              className="mt-2 px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
            >
              {user.role}
            </span>
          </div>

          {/* Section compte */}
          <div className="p-4">
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground"
            >
              COMPTE
            </h3>
            <div className="space-y-1">
              <ProfileOption
                icon={<UserIcon className="w-5 h-5" />}
                label="Modifier mon profil"
                description="Modifier vos informations personnelles"
              />
              <ProfileOption
                icon={<ShieldCheckIcon className="w-5 h-5" />}
                label="Sécurité"
                description="Gérer votre mot de passe et la sécurité du compte"
              />
              <ProfileOption
                icon={<BellIcon className="w-5 h-5" />}
                label="Notifications"
                description="Gérer vos préférences de notifications"
              />
            </div>
          </div>

          {/* Section préférences */}
          <div className="p-4">
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground"
            >
              PRÉFÉRENCES
            </h3>
            <div className="space-y-1">
              <ProfileOption
                icon={<Cog6ToothIcon className="w-5 h-5" />}
                label="Paramètres"
                description="Personnaliser votre expérience"
              />
            </div>
          </div>

          {/* Section déconnexion */}
          <div className="p-4 mt-auto">
            <button
              className="w-full flex items-center p-3 rounded-lg text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="text-destructive">Se déconnecter</div>
              </div>
            </button>
          </div>

          {/* Pied de page */}
          <div
            className="p-4 text-xs text-center text-muted-foreground"
          >
            Dernière connexion: Aujourd'hui à 10:45
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile