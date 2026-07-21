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
    avatar?: string;
    accountType?: AccountTypeEnum;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserQuery {
    pageSize?: number;
    page?: number;
    search?: string;
    order?: string;
}

export type IUserCreateDTO = Pick<
    IUser,
    "email" | "password" | "name" | "surname" | "age"
>;

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
    >
>;

export type IResetPasswordSendEmail = Pick<IUser, "email">;

export type IResetPassword = Pick<IUser, "password"> & { token: string };

export type IChangePassword = Pick<IUser, "password"> & { oldPassword: string };

export type ISetPassword = Pick<IUser, "password">;
