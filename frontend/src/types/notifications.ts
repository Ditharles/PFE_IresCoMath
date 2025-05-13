export interface Notification {
    id: string
    title: string
    message: string
    type: NotificationType
    status: NotificationStatus
    createdAt: Date | string
    userId: string
    user?: { 
      id: string

      email: string
    }
  }
  
  export enum NotificationType {
    REQUEST_RECEIVED = "REQUEST_RECEIVED",
    NEW_REQUEST = "NEW_REQUEST",
    REQUEST_APPROVED = "REQUEST_APPROVED",
    REQUEST_REJECTED = "REQUEST_REJECTED",
    NEW_SESSION = "NEW_SESSION",
    EQUIPMENT_BORROWED = "EQUIPMENT_BORROWED",
    EQUIPMENT_RETURNED = "EQUIPMENT_RETURNED",
    OTHER = "OTHER"
  }
  
  export enum NotificationStatus {
    UNREAD = "UNREAD",
    READ = "READ"
  }