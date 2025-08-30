import { NotificationGroup, NotificationStatus, NotificationType } from "../../enums/notification.enum";
import { Member } from "../member/member";
import { TotalCounter } from "../model/model";

export interface Notification {
    _id: string;
    notificationType: NotificationType;
    notificationStatus: NotificationStatus;
    notificationGroup: NotificationGroup;
    notificationTitle: string;
    notificationDesc?: string;
    authorId: string;
    receiverId: string;
    modelId?: string;
    articleId?: string;
    createdAt?: string;
    updatedAt?: string;

    /** from aggregation **/

    authorData?: Member;
}

export interface Notifications {
    list: Notification[];

    metaCounter: TotalCounter[];
}
