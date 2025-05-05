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
}

export default NotificationsService;
