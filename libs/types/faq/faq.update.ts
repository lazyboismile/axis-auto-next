import { FaqCategory, FaqStatus } from "../../enums/faq.enum";

export interface FaqUpdate {
    _id: string;
    faqStatus?: FaqStatus;
    faqCategory?: FaqCategory;
    subject?: string;
    content?: string;
}
