import { AdvertStatusEnum } from "../enums/advert-status.enum";
import { CurrencyEnum } from "../enums/currency.enum";
import { IExchangeRateData } from "./currency.interface";

interface IOwnerContacts {
    email: string;
    name: string;
    phone: string;
}

export interface IAdvert {
    _id: string;
    title: string;
    brandId: string;
    modelId: string;
    year: number;
    region: string;
    city: string;
    description: string;
    initialPrice: number;
    initialCurrency: CurrencyEnum;
    priceUAH: number;
    priceUSD: number;
    priceEUR: number;
    exchangeRate: IExchangeRateData;
    status: AdvertStatusEnum;
    _ownerId: string;
    ownerContacts: IOwnerContacts;
    photo?: string;
    attemptModerate: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface IAdvertResult {
    _id: string;
    title: string;
    brand: string;
    model: string;
    year: number;
    region: string;
    city: string;
    description: string;
    initialPrice: number;
    initialCurrency: CurrencyEnum;
    priceUAH: number;
    priceUSD: number;
    priceEUR: number;
    _ownerId: string;
    ownerContacts: IOwnerContacts[];
    exchangeRate: IExchangeRateData;
    photo?: string;
    status: AdvertStatusEnum;
    attemptModerate: number;
    createdAt: Date;
    updatedAt: Date;
}

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
    priceFrom?: number;
    priceTo?: number;
}

export type IAdvertCreateDTO = Pick<
    IAdvert,
    | "title"
    | "description"
    | "initialPrice"
    | "initialCurrency"
    | "brandId"
    | "modelId"
    | "year"
    | "city"
    | "region"
>;

export type IAdvertUpdateDTO = Partial<
    Pick<
        IAdvert,
        | "title"
        | "description"
        | "initialPrice"
        | "initialCurrency"
        | "priceUAH"
        | "priceUSD"
        | "priceEUR"
        | "exchangeRate"
        | "photo"
        | "brandId"
        | "modelId"
        | "year"
        | "city"
        | "region"
        | "status"
        | "attemptModerate"
        | "deletedAt"
    >
>;

export type IAdvertChangeStatusDTO = Pick<IAdvert, "status">;

export type IAdvertCalculatedPrices = Pick<
    IAdvert,
    "priceUAH" | "priceUSD" | "priceEUR" | "exchangeRate"
>;

export interface IAdvertCreate {
    title: string;
    brandId: string;
    modelId: string;
    year: number;
    region: string;
    city: string;
    description: string;
    initialPrice: number;
    initialCurrency: CurrencyEnum;
    priceUAH: number;
    priceUSD: number;
    priceEUR: number;
    exchangeRate: IExchangeRateData;
    status: AdvertStatusEnum;
    _ownerId: string;
    photo?: string;
}
