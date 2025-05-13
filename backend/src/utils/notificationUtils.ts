import { Role } from "../../generated/prisma";
import { NotificationTemplates } from "../constants/notificationsMessage";
import { getDirector, getSupervisor } from "../services/auth.service";
import NotificationsService from "../services/Notifications.service";


const isStudent = (role: Role): boolean =>
    role === Role.DOCTORANT || role === Role.MASTER;
  
  const getUserFullName = (user: {
    lastName: string;
    firstName: string;
  }): string => `${user.lastName} ${user.firstName}`;
  
  
export const sendRequestNotifications = async (user: any, requestType: string) => {
    try {
      // Notification to requester
      await NotificationsService.createNotification({
        userId: user.userId,
        ...NotificationTemplates.REQUEST_RECEIVED(requestType),
      });
  
      // Notification to director
      const director = await getDirector();
      if (director) {
        await NotificationsService.createNotification({
          userId: director.id,
          ...NotificationTemplates.NEW_REQUEST_DIRECTOR(
            getUserFullName(user),
            requestType
          ),
        });
      }
  
      if (isStudent(user.role)) {
        const supervisor = await getSupervisor(user.id);
        if (supervisor) {
          await NotificationsService.createNotification({
            userId: supervisor.id,
            ...NotificationTemplates.NEW_REQUEST_SUPERVISOR(
              getUserFullName(user),
              requestType
            ),
          });
        }
      }
    } catch (error) {
      console.error("Error sending notifications:", error);
    }
  };
  