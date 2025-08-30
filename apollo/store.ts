import { makeVar } from '@apollo/client';
import { CustomJwtPayload } from '../libs/types/customJwtPayload';

export const themeVar = makeVar({});

export const userVar = makeVar<CustomJwtPayload>({
    _id: '',
    memberType: '',
    memberStatus: '',
    memberAuthType: '',
    memberEmail: '',
    memberNick: '',
    memberFullName: '',
    memberImage: '',
    memberAddress: '',
    memberDesc: '',
    memberModels: 0,
    memberRank: 0,
    memberArticles: 0,
    memberPoints: 0,
    memberSales: 0,
    memberLikes: 0,
    memberViews: 0,
    memberWarnings: 0,
    memberBlocks: 0,
});

// @ts-ignore
export const socketVar = makeVar<WebSocket>();
