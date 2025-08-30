import { OrderStatus, PaymentMethod } from "../../enums/order.enum";

export interface OrderInput {
    modelId: string;
    paymentMethod: PaymentMethod;
    soldAt?: Date;
    paidAt?: Date;
    processedAt?: Date;
}

interface OISearch {
    orderStatus?: OrderStatus;
}

export interface OrderInquiry {
    page: number;
    limit: number;
    search: OISearch;
}