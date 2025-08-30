import { Direction } from "../../enums/common.enum";
import { NotificationGroup, NotificationStatus, NotificationType } from "../../enums/notification.enum";

export interface NotificationInput {
    notificationType: NotificationType;

    notificationGroup: NotificationGroup;

    notificationTitle: string;

    notificationDesc?: string;

    authorId?: string;

    receiverId?: string;

    modelId?: string;

    articleId?: string;
}

interface NISearch {
    notificationGroup?: NotificationGroup;

    text?: string;

    authorId?: string;
}

export interface NotificationsInquiry {
    page: number;

    limit: number;

    sort?: string;

    direction?: Direction;

    search: NISearch;
}

interface ANISearch {
    notificationType?: NotificationType;

    notificationStatus?: NotificationStatus;

    notificationGroup?: NotificationGroup;
}

export interface AllNotificationInquiry {
    page: number;

    limit: number;

    sort?: string;

    direction?: Direction;

    search: ANISearch;
}
