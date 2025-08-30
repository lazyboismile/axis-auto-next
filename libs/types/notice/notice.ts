import { NoticeCategory, NoticeStatus } from "../../enums/notice.enum";
import { Member } from "../member/member";
import { TotalCounter } from "../model/model";

export interface Notice {
    _id: string;

    noticeCategory: NoticeCategory;
    noticeStatus: NoticeStatus;
    noticeTitle: string;
    noticeContent: string;
    memberId: string;
    createdAt: Date;
    updatedAt: Date;

    event?: Boolean;

    /** from aggregation **/

    memberData?: Member;
}

export interface Notices {
    list: Notice[];

    metaCounter: TotalCounter[];
}
