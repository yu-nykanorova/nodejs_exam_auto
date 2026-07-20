import { AdvertStatusEnum } from "../enums/advert-status.enum";

export interface IAdvert {
    _id: string;
    title: string;
    brand: string;
    model: string;
    year: number;
    region: string;
    city: string;
    description: string;
    price: number;
    status: AdvertStatusEnum;
    _ownerId: string;
    avatar?: string;
    viewsCount: number;
}

export interface IAdvertQuery {
    pageSize?: number;
    page?: number;
    search?: string;
    order?: string;
    brand?: string;
    model?: string;
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
    | "price"
    | "brand"
    | "model"
    | "year"
    | "city"
    | "region"
>;

export type IAdvertUpdateDTO = Partial<
    Pick<
        IAdvert,
        | "title"
        | "description"
        | "price"
        | "avatar"
        | "brand"
        | "model"
        | "year"
        | "city"
        | "region"
        | "viewsCount"
    >
>;
