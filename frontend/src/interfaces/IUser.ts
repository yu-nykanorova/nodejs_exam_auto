import type { Role } from "../constants/roles.ts";

export interface IUser {
    _id: string;
    email: string;
    name: string;
    surname: string;
    age: number;
    phone: string | undefined;
    avatar: string | undefined;
    role: Role;
    accountType: string;
    status: string;
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
    | "accountType"
    | "phone"
> & { password: string; }>;

export type IUserChangeStatus = Pick<IUser, "status">;

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

