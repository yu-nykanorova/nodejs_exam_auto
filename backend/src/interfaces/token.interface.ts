import { UserRoleEnum } from "../enums/user-role.enum";

export interface IToken {
    _id: string;
    accessToken: string;
    refreshToken: string;
    _userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITokenPayload {
    userId: string;
    role: UserRoleEnum;
}

export type ITokenPair = Pick<IToken, "accessToken" | "refreshToken">;

export type IRefresh = Pick<IToken, "refreshToken">;
