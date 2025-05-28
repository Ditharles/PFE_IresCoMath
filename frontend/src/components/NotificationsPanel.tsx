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
import { Notification, NotificationStatus, NotificationType } from "../types/notifications"
import NotificationsService from "../services/notifcations.service"

interface NotificationsPanelProps {
  onClose: () => void
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  onClose,
}) => {
  const notificationService = new NotificationsService()
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all")
  const [notificationsList, setNotificationsList] = useState<Notification[]>([])

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await notificationService.getNotifications()
        setNotificationsList(response.data.sort((a: Notification, b: Notification) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
      } catch (error) {
        console.error("Error fetching notifications:", error)
      }
    }

    fetchNotifications()

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

  const formatTime = (dateString: string | Date) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return diffInMinutes < 1 ? "À l'instant" : `Il y a ${diffInMinutes} min`
    } else if (diffInHours < 24) {
      return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id)
      setNotificationsList(prev =>
        prev.map(notification =>
          notification.id === id
            ? { ...notification, status: NotificationStatus.READ }
            : notification
        )
      )
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead()
      setNotificationsList(prev =>
        prev.map(notification => ({
          ...notification,
          status: NotificationStatus.READ
        }))
      )
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
    }
  }

  const deleteNotification = async (id: string) => {
    try {
      // await notificationService.deleteNotification(id)
      setNotificationsList(prev => prev.filter(notification => notification.id !== id))
    } catch (error) {
      console.error("Error deleting notification:", error)
    }
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.REQUEST_APPROVED:
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      case NotificationType.REQUEST_REJECTED:
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
      case NotificationType.REQUEST_RECEIVED:
        return <BellIcon className="w-5 h-5 text-blue-500" />
      case NotificationType.EQUIPMENT_BORROWED:
      case NotificationType.EQUIPMENT_RETURNED:
        return <InformationCircleIcon className="w-5 h-5 text-yellow-500" />
      case NotificationType.NEW_SESSION:
        return <InformationCircleIcon className="w-5 h-5 text-purple-500" />
      default:
        return <InformationCircleIcon className="w-5 h-5 text-gray-500" />
    }
  }

  const filteredNotifications =
    activeTab === "all"
      ? notificationsList
      : notificationsList.filter(notification => notification.status === NotificationStatus.UNREAD)

  const unreadCount = notificationsList.filter(
    notification => notification.status === NotificationStatus.UNREAD
  ).length

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={handleClose}>
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${isVisible ? "opacity-30" : "opacity-0"
          }`}
      />

      <div
        className={`relative w-full max-w-md h-full bg-background text-primary shadow-xl transition-transform duration-300 ease-in-out ${isVisible ? "translate-x-0" : "translate-x-full"
          }`}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between p-4 border-b border-gray-200"
        >
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">Notifications</h2>
            {unreadCount > 0 && (
              <span
                className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800"
              >
                {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-gray-100"
            aria-label="Fermer"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === "all"
              ? "border-b-2 border-blue-500 text-blue-600"
              : ""
              }`}
            onClick={() => setActiveTab("all")}
          >
            Toutes
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === "unread"
              ? "border-b-2 border-blue-500 text-blue-600"
              : ""
              }`}
            onClick={() => setActiveTab("unread")}
          >
            Non lues
          </button>
        </div>

        <div className="flex justify-end p-2 border-b border-gray-200">
          <button
            onClick={markAllAsRead}
            className="text-sm px-3 py-1 rounded text-blue-600 hover:bg-gray-100"
            disabled={unreadCount === 0}
          >
            Tout marquer comme lu
          </button>
        </div>

        <div className="h-full overflow-y-auto pb-16" style={{ maxHeight: "calc(100% - 120px)" }}>
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <BellIcon className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-center text-gray-500">
                {activeTab === "all" ? "Aucune notification" : "Aucune notification non lue"}
              </p>
            </div>
          ) : (
            <div>
              {filteredNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-200 ${notification.status === NotificationStatus.UNREAD
                    ? "bg-blue-50"
                    : ""
                    }`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className={`font-medium ${notification.status === NotificationStatus.UNREAD ? "font-semibold" : ""
                          }`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {formatTime(notification.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm mt-1 text-gray-600">
                        {notification.message}
                      </p>
                      <div className="flex justify-end mt-2 space-x-2">
                        {notification.status === NotificationStatus.UNREAD && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs px-2 py-1 rounded flex items-center text-blue-600 hover:bg-blue-100"
                          >
                            <CheckIcon className="w-3 h-3 mr-1" />
                            Marquer comme lu
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-xs px-2 py-1 rounded flex items-center text-red-600 hover:bg-red-100"
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

export default NotificationsPanel
