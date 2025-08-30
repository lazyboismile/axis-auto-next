import { Direction } from "../../enums/common.enum";
import { NoticeCategory, NoticeStatus } from "../../enums/notice.enum";

export interface NoticeInput {
    noticeCategory: NoticeCategory;

    noticeTitle: string;

    noticeContent: string;

    memberId?: string;

    event?: Boolean;
}

interface NISearch {
    noticeCategory?: NoticeCategory;

    noticeStatus?: NoticeStatus;

    text?: string;

    memberId?: string;
}

export interface NoticesInquiry {
    page: number;

    limit: number;

    sort?: string;

    direction?: Direction;

    search: NISearch;
}

interface ANINSearch {
    noticeCategory?: NoticeCategory;

    noticeStatus?: NoticeStatus;

    noticeTitle?: String;
}

export interface AllNoticesInquiry {
    page: number;

    limit: number;

    sort?: string;

    direction?: Direction;

    search: ANINSearch;
}
