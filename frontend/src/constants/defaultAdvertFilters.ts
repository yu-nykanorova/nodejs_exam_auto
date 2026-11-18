import { Currencies } from "./currencies.ts";
import type { IAdvertFilters } from "../interfaces/IAdvert.ts";
import { advertsSortOrder } from "./advertSortOrder.ts";

export const defaultAdvertFilters: IAdvertFilters = {
    title: "",
    brandId: "",
    modelId: "",
    yearFrom: "",
    yearTo: "",
    region: "",
    city: "",
    priceFrom: "",
    priceTo: "",
    currency: Currencies.USD,
    order: `-${advertsSortOrder.CREATED_AT}`,
};