import type { Role } from "../constants/roles.ts";

export interface IUser {
    _id: string;
    email: string;
    name: string;
    surname: string;
    age: number;
    phone: string;
    avatar: string | undefined;
    role: Role;
    accountType: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface IUserResponse
{
    totalItems: number;
    totalPages: number;
    prevPage: number;
    nextPage: number;
    data: IUser[];
}