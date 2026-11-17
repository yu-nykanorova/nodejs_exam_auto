import type { IAdvertFilters, IAdvertQuery } from "../interfaces/IAdvert.ts";
import type { Currency } from "../constants/currencies.ts";

export const getAdvertsFilters = (filters: IAdvertFilters): IAdvertQuery => {
    return {
        ...(filters.title && {search: filters.title}),
        ...(filters.brandId && {brandId: filters.brandId}),
        ...(filters.modelId && {modelId: filters.modelId}),
        ...(filters.yearFrom && {yearFrom: Number(filters.yearFrom)}),
        ...(filters.yearTo && {yearTo: Number(filters.yearTo)}),
        ...(filters.region && {region: filters.region}),
        ...(filters.city && {city: filters.city}),
        ...(filters.priceFrom && {priceFrom: Number(filters.priceFrom)}),
        ...(filters.priceTo && {priceTo: Number(filters.priceTo)}),
        ...(filters.currency && {currency: filters.currency as Currency}),
    };
};

