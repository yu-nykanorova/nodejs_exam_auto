import type { IAuthUserResponse, IChangePasswordRequest, ILoginRequest, ISetPasswordRequest } from "../interfaces/IAuth.ts";
import type { IUserCreate } from "../interfaces/IUser.ts";
import { postItem, putItem } from "./api.service.ts";

export const authService = {

    signUpSeller: async (
        body: IUserCreate,
    ): Promise<IAuthUserResponse> => {
        return await postItem<
            IAuthUserResponse,
            IUserCreate
        >(
            "/auth/sign-up/seller",
            body,
        );
    },

    signUpBuyer: async (
        body: IUserCreate,
    ): Promise<IAuthUserResponse> => {
        return await postItem<
            IAuthUserResponse,
            IUserCreate
        >(
            "/auth/sign-up/buyer",
            body,
        );
    },

    login: async (
        body: ILoginRequest,
    ): Promise<IAuthUserResponse> => {
        return await postItem<
            IAuthUserResponse,
            ILoginRequest
        >(
            "/auth/login",
            body,
        );
    },

    sendForgotPasswordEmail: async (
        body: { email: string },
    ): Promise<void> => {
        await postItem(
            "/auth/forgot-password",
            body,
        );
    },

    resetPassword: async (
        body: ISetPasswordRequest,
    ): Promise<void> => {
        await putItem(
            "/auth/forgot-password",
            body,
        );
    },

    changePassword: async (
        body: IChangePasswordRequest,
    ): Promise<void> => {
        await putItem(
            "/auth/change-password",
            body,
        );
    },

    setPassword: async (
        body: ISetPasswordRequest,
    ): Promise<void> => {
        await putItem(
            "/auth/set-password",
            body,
        );
    },

    logout: async (
        body: { refreshToken: string }
    ): Promise<void> => {
        await postItem(
            "/auth/logout",
            body,
        );
    },
};