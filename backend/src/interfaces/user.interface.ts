import { AccountTypeEnum } from "../enums/account-type.enum";
import { UserRoleEnum } from "../enums/user-role.enum";
import { UserStatusEnum } from "../enums/user-status.enum";

export interface IUser {
    _id: string;
    email: string;
    password: string;
    role: UserRoleEnum;
    status: UserStatusEnum;
    name: string;
    surname: string;
    age: number;
    phone?: string;
    avatar?: string;
    accountType: AccountTypeEnum;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface IUserPublic {
    _id: string;
    email: string;
    name: string;
    surname: string;
    age: number;
    phone?: string;
    avatar?: string;
    role: UserRoleEnum;
    accountType: AccountTypeEnum;
    status: UserStatusEnum;
    createdAt: string;
    updatedAt: string;
}

export interface IUserQuery {
    pageSize?: number;
    page?: number;
    search?: string;
    order?: string;
}

export type IUserCreateManagerDTO = Pick<
    IUser,
    "email" | "name" | "surname" | "age"
>;

export type IUserCreateBuyerDTO = Pick<
    IUser,
    "email" | "password" | "name" | "surname" | "age"
>;

export type IUserCreateSellerDTO = Pick<
    IUser,
    "email" | "password" | "name" | "surname" | "age" | "phone"
>;

export interface IUserCreate {
    email: string;
    password?: string;
    name: string;
    surname: string;
    age: number;
    role: UserRoleEnum;
    status: UserStatusEnum;
    phone?: string;
    accountType?: AccountTypeEnum;
}

export type IUserUpdateDTO = Partial<
    Pick<
        IUser,
        | "email"
        | "name"
        | "surname"
        | "age"
        | "avatar"
        | "accountType"
        | "status"
        | "phone"
        | "deletedAt"
    >
>;

export type IUserRepositoryUpdate = Partial<
    Pick<
        IUser,
        | "email"
        | "password"
        | "name"
        | "surname"
        | "age"
        | "avatar"
        | "accountType"
        | "status"
        | "phone"
        | "deletedAt"
    >
>;

export interface IUserChangeStatusDTO {
    status: UserStatusEnum;
}

export interface IUserUpdateAccountTypeDTO {
    accountType: AccountTypeEnum;
}

export interface IResetPasswordSendEmail {
    email: string;
}

export interface IResetPassword {
    password: string;
}

export interface IChangePassword {
    oldPassword: string;
    password: string;
}

export interface ISetPassword {
    password: string;
}
