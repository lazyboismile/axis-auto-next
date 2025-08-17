import { MemberAuthType, MemberStatus, MemberType } from "../../enums/member.enum";
import { MeFollowed } from "../follow/follow";
import { MeLiked, TotalCounter } from "../model/model";


export interface Member {
    _id: string;
    memberType: MemberType;
    memberStatus: MemberStatus;
    memberAuthType: MemberAuthType;
    memberEmail: string;
    memberNick: string;
    memberPassword?: string;
    memberFullName?: string;
    memberImage?: string;
    memberAddress?: string;
    memberDesc?: string;
    memberModels: number;
    memberRank: number;
    memberArticles: number;
    memberPoints: number;
    memberLikes: number;
    memberFollowers?: number;
    memberFollowings?: number;
    memberViews: number;
    memberComments: number;
    memberWarnings: number;
    memberBlocks: number;
    memberSales: number;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    // Enable for authentications
    meLiked?: MeLiked[];
    meFollowed?: MeFollowed[];
    accessToken?: string;
}

export interface Members {
    list: Member[];
    metaCounter: TotalCounter[];
}