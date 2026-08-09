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

export type IUserChangeStatusDTO = Pick<IUser, "status">;

export type IUserUpdateAccountTypeDTO = Pick<IUser, "accountType">;

export type IResetPasswordSendEmail = Pick<IUser, "email">;

export type IResetPassword = Pick<IUser, "password"> & { token: string };

export type IChangePassword = Pick<IUser, "password"> & { oldPassword: string };

export type ISetPassword = Pick<IUser, "password">;
