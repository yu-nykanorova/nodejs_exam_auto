import type { Role } from "../constants/roles.ts";
import type { AccountType } from "../constants/accountTypes.ts";
import type { UserStatus } from "../constants/userStatuses.ts";

export interface IUser {
    _id: string;
    email: string;
    name: string;
    surname: string;
    age: number;
    phone: string | undefined;
    avatar: string | undefined;
    role: Role;
    accountType?: AccountType;
    status: UserStatus;
    createdAt: string;
    updatedAt: string;
}

export interface IUserCreate {
    email: string;
    password?: string;
    name: string;
    surname: string;
    age: number;
    phone?: string;
}

export type IUserUpdate = Partial<Pick<IUser,
    | "email"
    | "name"
    | "surname"
    | "age"
    | "avatar"
    | "phone"
>>;

export type IUserChangeStatus = Pick<IUser, "status">;

export interface IUserUpdateAccountType {
    accountType: AccountType;
}

export interface IUserQuery {
    pageSize?: number;
    page?: number;
    search?: string;
    order?: string;
}

export interface IUserResponse
{
    totalItems: number;
    totalPages: number;
    prevPage: boolean;
    nextPage: boolean;
    data: IUser[];
}

