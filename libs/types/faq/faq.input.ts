import { Direction } from "../../enums/common.enum";
import { FaqCategory, FaqStatus } from "../../enums/faq.enum";

export interface FaqInput {
    faqCategory: FaqCategory;
    subject: string;
    content?: string;

    memberId?: string;
}

interface FISearch {
    faqCategory?: FaqCategory;
    faqStatus?: FaqStatus;
    text?: string;

    memberId?: string;
}

export interface FaqsInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: FISearch;
}

interface AFISearch {
    faqStatus?: FaqStatus;
    faqCategory?: FaqCategory;
}

export interface AllFaqInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: AFISearch;
}
