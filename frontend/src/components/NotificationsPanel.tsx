"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  XMarkIcon,
  BellIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: "info" | "success" | "warning" | "error"
}

interface NotificationsPanelProps {
  darkMode: boolean
  onClose: () => void
  notifications?: Notification[]
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  darkMode,
  onClose,
  notifications = defaultNotifications,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all")
  const [notificationsList, setNotificationsList] = useState<Notification[]>(notifications)

  // Animation d'entrée
  useEffect(() => {
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
    }, 300)
  }

  // Marquer une notification comme lue
  const markAsRead = (id: string) => {
    setNotificationsList(
      notificationsList.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  // Marquer toutes les notifications comme lues
  const markAllAsRead = () => {
    setNotificationsList(notificationsList.map((notification) => ({ ...notification, read: true })))
  }

  // Supprimer une notification
  const deleteNotification = (id: string) => {
    setNotificationsList(notificationsList.filter((notification) => notification.id !== id))
  }

  // Filtrer les notifications selon l'onglet actif
  const filteredNotifications =
    activeTab === "all" ? notificationsList : notificationsList.filter((notification) => !notification.read)

  // Nombre de notifications non lues
  const unreadCount = notificationsList.filter((notification) => !notification.read).length

  // Obtenir l'icône selon le type de notification
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <InformationCircleIcon className="w-5 h-5 text-blue-500" />
      case "success":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      case "warning":
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
      case "error":
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
      default:
        return <BellIcon className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={handleClose}>
      {/* Overlay semi-transparent */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-30" : "opacity-0"
        }`}
      />

      {/* Panneau latéral */}
      <div
        className={`relative w-full max-w-md h-full ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        } shadow-xl transition-transform duration-300 ease-in-out ${isVisible ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête du panneau */}
        <div
          className={`flex items-center justify-between p-4 border-b ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">Notifications</h2>
            {unreadCount > 0 && (
              <span
                className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  darkMode ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-800"
                }`}
              >
                {unreadCount} non lues
              </span>
            )}
          </div>
          <button
            onClick={handleClose}
            className={`p-1.5 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
            aria-label="Fermer"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Onglets */}
        <div className={`flex border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === "all"
                ? darkMode
                  ? "border-b-2 border-blue-500 text-blue-400"
                  : "border-b-2 border-blue-500 text-blue-600"
                : ""
            }`}
            onClick={() => setActiveTab("all")}
          >
            Toutes
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === "unread"
                ? darkMode
                  ? "border-b-2 border-blue-500 text-blue-400"
                  : "border-b-2 border-blue-500 text-blue-600"
                : ""
            }`}
            onClick={() => setActiveTab("unread")}
          >
            Non lues
          </button>
        </div>

        {/* Actions */}
        <div className={`flex justify-end p-2 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <button
            onClick={markAllAsRead}
            className={`text-sm px-3 py-1 rounded ${
              darkMode ? "text-blue-400 hover:bg-gray-700" : "text-blue-600 hover:bg-gray-100"
            }`}
          >
            Tout marquer comme lu
          </button>
        </div>

        {/* Liste des notifications */}
        <div className="h-full overflow-y-auto pb-16" style={{ maxHeight: "calc(100% - 120px)" }}>
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <BellIcon className={`w-12 h-12 ${darkMode ? "text-gray-600" : "text-gray-300"} mb-4`} />
              <p className={`text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                {activeTab === "all" ? "Aucune notification" : "Aucune notification non lue"}
              </p>
            </div>
          ) : (
            <div>
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"} ${
                    !notification.read ? (darkMode ? "bg-gray-750" : "bg-blue-50") : ""
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                          {notification.title}
                        </h3>
                        <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {notification.time}
                        </span>
                      </div>
                      <p className={`text-sm mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {notification.message}
                      </p>
                      <div className="flex justify-end mt-2 space-x-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className={`text-xs px-2 py-1 rounded flex items-center ${
                              darkMode ? "text-blue-400 hover:bg-gray-700" : "text-blue-600 hover:bg-blue-100"
                            }`}
                          >
                            <CheckIcon className="w-3 h-3 mr-1" />
                            Marquer comme lu
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className={`text-xs px-2 py-1 rounded flex items-center ${
                            darkMode ? "text-red-400 hover:bg-gray-700" : "text-red-600 hover:bg-red-100"
                          }`}
                        >
                          <TrashIcon className="w-3 h-3 mr-1" />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Données de notifications par défaut
const defaultNotifications: Notification[] = [
  {
    id: "1",
    title: "Demande approuvée",
    message: "Votre demande de congé du 15 au 20 juin a été approuvée par l'administration.",
    time: "Il y a 2 heures",
    read: false,
    type: "success",
  },
  {
    id: "2",
    title: "Rappel: Réunion",
    message: "Rappel: Vous avez une réunion d'équipe demain à 10h00 dans la salle de conférence.",
    time: "Il y a 5 heures",
    read: true,
    type: "info",
  },
  {
    id: "3",
    title: "Document en attente",
    message: "Votre justificatif d'absence est en attente de validation. Veuillez vérifier son statut.",
    time: "Hier",
    read: false,
    type: "warning",
  },
  {
    id: "4",
    title: "Demande rejetée",
    message:
      "Votre demande de télétravail pour le 22 juillet a été rejetée. Contactez votre responsable pour plus d'informations.",
    time: "Il y a 2 jours",
    read: true,
    type: "error",
  },
  {
    id: "5",
    title: "Nouveau message",
    message: "Vous avez reçu un nouveau message de la part du service RH concernant votre dossier.",
    time: "Il y a 3 jours",
    read: true,
    type: "info",
  },
]

export default NotificationsPanel
