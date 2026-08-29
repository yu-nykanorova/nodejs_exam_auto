import type { IUser } from "./IUser.ts";

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ISignUpRequest {
    email: string;
    password: string;
    name: string;
    surname: string;
    age: number;
    phone?: string;
}

export interface IChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export interface ISetPasswordRequest {
    token: string;
    password: string;
}

export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
}

export interface IAuthUserResponse {
    user: IUser;
    tokens: IAuthResponse;
}
