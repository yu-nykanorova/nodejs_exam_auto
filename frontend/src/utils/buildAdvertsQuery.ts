import type { IAdvertQuery } from "../interfaces/IAdvert.ts";
import { Currencies, type Currency } from "../constants/currencies.ts";
import { getAdvertsFilters } from "./getAdvertsFilters.ts";

export const buildAdvertsQuery = (params: URLSearchParams): IAdvertQuery => {
    return getAdvertsFilters ({
        title: params.get ("title") ?? "",
        brandId: params.get ("brandId") ?? "",
        modelId: params.get ("modelId") ?? "",
        yearFrom: params.get ("yearFrom") ?? "",
        yearTo: params.get ("yearTo") ?? "",
        region: params.get ("region") ?? "",
        city: params.get ("city") ?? "",
        priceFrom: params.get ("priceFrom") ?? "",
        priceTo: params.get ("priceTo") ?? "",
        currency: (params.get ("currency") || Currencies.USD) as Currency,
    });
};

