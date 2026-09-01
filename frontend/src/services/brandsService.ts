import { getItems } from "./api.service.ts";
import type { IBrand, IBrandRequest } from "../interfaces/IBrand.ts";

export const brandService = {
    getBrands: async (): Promise<IBrand[]> => {
        return await getItems<IBrand[]>("/brands");
    },

    getBrandRequests: async (): Promise<IBrandRequest[]> => {
        return await getItems<IBrandRequest[]>("/brands/requests");
    },
};
