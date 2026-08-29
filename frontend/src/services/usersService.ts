import type { IUser, IUserChangeStatus, IUserCreate, IUserQuery, IUserResponse, IUserUpdate } from "../interfaces/IUser.ts";
import { deleteItem, getItems, patchItem, postItem, putItem } from "./api.service.ts";
import type { IAdvertResponse } from "../interfaces/IAdvert.ts";

export const usersService = {

    getUsers: async (
        params?: IUserQuery,
    ): Promise<IUserResponse> => {
        return await getItems<IUserResponse>(
            "/users",
            params,
        );
    },

    getMe: async (): Promise<IUser> => {
        return await getItems<IUser>("/users/me");
    },

    getMeAdverts: async (): Promise<IAdvertResponse> => {
        return await getItems<IAdvertResponse>(
            "/users/me/adverts",
        );
    },

    updateMe: async (
        body: IUserUpdate,
    ): Promise<IUser> => {
        return await putItem<IUser, IUserUpdate>(
            "/users/me",
            body,
        );
    },

    updateAccountType: async (
        body: IUserUpdate,
    ): Promise<IUser> => {
        return await patchItem<
            IUser,
            IUserUpdate
        >(
            "/users/me/account-type",
            body,
        );
    },

    deleteMe: async (): Promise<void> => {
        await deleteItem("/users/me");
    },

    uploadAvatar: async (
        body: FormData,
    ): Promise<IUser> => {
        return await postItem<IUser, FormData>(
            "/users/me/avatar",
            body,
        );
    },

    deleteAvatar: async (): Promise<void> => {
        await deleteItem("/users/me/avatar");
    },

    createManager: async (
        body: IUserCreate,
    ): Promise<IUser> => {
        return await postItem<
            IUser,
            IUserCreate
        >(
            "/users/managers",
            body,
        );
    },

    getUserById: async (
        id: string,
    ): Promise<IUser> => {
        return await getItems<IUser>(
            `/users/${id}`,
        );
    },

    updateUserStatus: async (
        id: string,
        body: IUserChangeStatus,
    ): Promise<IUser> => {
        return await patchItem<
            IUser,
            IUserChangeStatus
        >(
            `/users/${id}/status`,
            body,
        );
    },

    deleteUser: async (
        id: string,
    ): Promise<void> => {
        await deleteItem(`/users/${id}`);
    },
};