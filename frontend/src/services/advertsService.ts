import { deleteItem, getItems, patchItem, postItem, putItem } from "./api.service.ts";
import type { IAdvert, IAdvertChangeStatus, IAdvertCreate, IAdvertQuery, IAdvertResponse, IAdvertStatistics, IAdvertUpdate } from "../interfaces/IAdvert.ts";

export const advertsService = {
    getAdverts: async (
        params?: IAdvertQuery,
    ): Promise<IAdvertResponse> => {
        return await getItems<IAdvertResponse>(
            "/adverts",
            params,
        );
    },

    getMyAdverts: async (
        params?: IAdvertQuery,
    ): Promise<IAdvertResponse> => {
        return await getItems<IAdvertResponse>(
            "/users/me/adverts",
            params,
        );
    },

    getAdvertById: async (
        id: string,
    ): Promise<IAdvert> => {
        return await getItems<IAdvert>(
            `/adverts/${id}`,
        );
    },

    createAdvert: async (
        body: IAdvertCreate,
    ): Promise<IAdvert> => {
        return await postItem<IAdvert, IAdvertCreate>(
            "/adverts",
            body,
        );
    },

    updateAdvert: async (
        id: string,
        body: IAdvertUpdate,
    ): Promise<IAdvert> => {
        return await putItem<IAdvert, IAdvertUpdate>(
            `/adverts/${id}`,
            body,
        );
    },

    uploadPhoto: async (
        id: string,
        body: FormData,
    ): Promise<IAdvert> => {
        return await postItem<IAdvert, FormData>(
            `/adverts/${id}/photo`,
            body,
        );
    },

    deletePhoto: async (
        id: string,
    ): Promise<void> => {
        await deleteItem(`/adverts/${id}/photo`);
    },

    updateAdvertStatus: async (
        id: string,
        body: IAdvertChangeStatus,
    ): Promise<IAdvert> => {
        return await patchItem<
            IAdvert,
            IAdvertChangeStatus
        >(
            `/adverts/${id}/status`,
            body,
        );
    },

    deleteAdvert: async (
        id: string,
    ): Promise<void> => {
        await deleteItem(`/adverts/${id}`);
    },

    getAdvertStatistics: async (
        id: string,
    ): Promise<IAdvertStatistics> => {
        return await getItems<IAdvertStatistics>(
            `/adverts/${id}/statistics`,
        );
    },

    postAdvertView: async (
        id: string,
    ): Promise<void> => {
        await postItem<void>(`/adverts/${id}/view`);
    },
};