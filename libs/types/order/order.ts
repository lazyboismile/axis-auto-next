import { OrderStatus, PaymentMethod } from "../../enums/order.enum";
import { Member } from "../member/member";
import { Model, TotalCounter } from "../model/model";

export interface Order {
    _id: string;
    buyerId: string;
    modelId: string;
    agentId: string;
    orderStatus: OrderStatus;
    orderPrice: number;
    paymentMethod: PaymentMethod;
    isPaid: boolean;
    soldAt: Date;
    paidAt: Date;
    processedAt: Date;
    createdAt: Date;
    updatedAt: Date;

    /** from aggregation */
    modelData: Model;
    agentData: Member;
    buyerData: Member;
}

export interface Orders {
    list: Order[]
    metaCounter: TotalCounter[];
}