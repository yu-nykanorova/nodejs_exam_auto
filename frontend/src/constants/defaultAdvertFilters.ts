import { Currencies } from "./currencies.ts";
import type { IAdvertFilters } from "../interfaces/IAdvert.ts";

export const defaultAdvertFilters: IAdvertFilters = {
    brandId: "",
    modelId: "",
    yearFrom: "",
    yearTo: "",
    region: "",
    city: "",
    priceFrom: "",
    priceTo: "",
    currency: Currencies.USD,
};