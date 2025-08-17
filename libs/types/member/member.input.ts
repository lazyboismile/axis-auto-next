import { Direction } from '../../enums/common.enum';
import { MemberAuthType, MemberStatus, MemberType } from '../../enums/member.enum';

export interface MemberInput {
    memberNick: string;
    memberPassword: string;
    memberEmail: string;
    memberType?: MemberType;
    memberAuthType?: MemberAuthType;
}

export interface LoginInput {
    memberEmail: string;
    memberPassword: string;
}

interface AISearch {
    text?: string;
}

export interface AgentsInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: AISearch;
}

interface MISearch {
    memberStatus?: MemberStatus;
    memberType?: MemberType;
    text?: string;
}

export interface MembersInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: MISearch;
}
