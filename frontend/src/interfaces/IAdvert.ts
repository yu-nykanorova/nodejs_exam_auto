import type { IModel } from "./IModel.ts";
import type { IBrand } from "./IBrand.ts";

export interface IAdvert {
    _id: string;
    title: string;
    brand: IBrand;
    model: IModel;
    year: number;
    region: string;
    city: string;
    description: string;
    initialPrice: number;
    initialCurrency: Currency;
    priceUAH: number;
    priceUSD: number;
    priceEUR: number;
    exchangeRate: IExchangeRateData;
    status: AdvertStatus
    _ownerId: string;
    ownerContacts: IOwnerContacts;
    photo?: string;
    attemptModerate: number;
    createdAt: string;
    updatedAt: string;
}

export interface IAdvertCreate {
    title: string;
    brandId: string;
    modelId: string;
    year: number;
    region: string;
    city: string;
    description: string;
    initialPrice: number;
    initialCurrency: Currency;
}

export type IAdvertUpdate = Partial<Pick<IAdvert,
    | "title"
    | "description"
    | "initialPrice"
    | "initialCurrency"
    | "year"
    | "region"
    | "city"
    | "photo"
> & { brandId: string; modelId: string; }>;

export type IAdvertChangeStatus = Pick<IAdvert, "status">;

export interface IAdvertQuery {
    pageSize?: number;
    page?: number;
    search?: string;
    order?: string;
    brandId?: string;
    modelId?: string;
    yearFrom?: number;
    yearTo?: number;
    city?: string;
    region?: string;
    currency?: Currency;
    priceFrom?: number;
    priceTo?: number;
}

export interface IAdvertResponse
{
    totalItems: number;
    totalPages: number;
    prevPage: boolean;
    nextPage: boolean;
    data: IAdvert[];
}

export interface IAdvertStatistics {
    viewsCount: number;
    viewsToday: number;
    viewsWeek: number;
    viewsMonth: number;
    averageRegionPrice: number;
    averageCountryPrice: number;
}

export type Currency = 'UAH' | 'USD' | 'EUR';

export type AdvertStatus = "PENDING" | "ACTIVE" | "BLOCKED" | "DELETED" | "SOLD";

interface IExchangeRateData {
    EUR: number;
    USD: number;
    date: string;
}

interface IOwnerContacts {
    email: string;
    name: string;
    phone: string;
}


