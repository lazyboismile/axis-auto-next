import { JwtPayload } from 'jwt-decode';

export interface CustomJwtPayload extends JwtPayload {
    _id: string;
    memberType: string;
    memberStatus: string;
    memberAuthType: string;
    memberEmail: string;
    memberNick: string;
    memberFullName?: string;
    memberImage?: string;
    memberAddress?: string;
    memberDesc?: string;
    memberModels: number;
    memberRank: number;
    memberArticles: number;
    memberPoints: number;
    memberLikes: number;
    memberViews: number;
    memberWarnings: number;
    memberBlocks: number;
}
