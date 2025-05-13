import api from "../api/axios";

class NotificationsService {
  async getNotifications() {
    const response = await api.get("/notifications/get-notifications");
    return response;
  }
  async getNotification(id: string) {
    const response = await api.get(`/notifications/get-notification/${id}`);
    return response;
  }
  async markAsRead(id: string) {
    const response = await api.get(`/notifications/read-notification/${id}`);
    return response;
  }
  async markAllAsRead() {
    const response = await api.get("/notifications/read-all-notifications");
    return response;
  }
  async getUnreadNumberNotifications() {
    const response = await api.get("/notifications/get-unread-number-notifications");
    return response;
  }
}

export default NotificationsService;
