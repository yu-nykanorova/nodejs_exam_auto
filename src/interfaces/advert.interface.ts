import { AdvertStatusEnum } from "../enums/advert-status.enum";
import { CurrencyEnum } from "../enums/currency.enum";

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
    exchangeRate: {
        USD: number;
        EUR: number;
    };
    status: AdvertStatusEnum;
    _ownerId: string;
    ownerContacts: IOwnerContacts;
    avatar?: string;
    viewsCount: number;
    attemptModerate: number;
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
        | "avatar"
        | "brandId"
        | "modelId"
        | "year"
        | "city"
        | "region"
        | "viewsCount"
        | "status"
        | "attemptModerate"
    >
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
    exchangeRate: {
        USD: number;
        EUR: number;
    };
    status: AdvertStatusEnum;
    _ownerId: string;
    avatar?: string;
}
