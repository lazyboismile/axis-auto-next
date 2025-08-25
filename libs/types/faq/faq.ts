import { FaqCategory, FaqStatus } from "../../enums/faq.enum";
import { Member } from "../member/member";
import { TotalCounter } from "../model/model";

export interface Faq {
    _id: string;
    faqCategory: FaqCategory;
    faqStatus: FaqStatus;
    subject: string;
    content: string;
    memberId: string;
    createdAt: Date;
    updatedAt: Date;

    /** from aggregation **/
    memberData?: Member;
}

export interface Faqs {
    list: Faq[];

    metaCounter: TotalCounter[];
}
