import type { IModel, IModelRequest } from "../interfaces/IModel.ts";
import { getItems } from "./api.service.ts";

export const modelService = {
    getModels: async (
        brandId?: string,
    ): Promise<IModel[]> => {
        return await getItems<IModel[]>("/models", {
            brandId,
        });
    },

    getModelRequests: async (): Promise<IModelRequest[]> => {
        return await getItems<IModelRequest[]>("/models/requests");
    },
};