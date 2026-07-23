import { AdvertStatusEnum } from "../enums/advert-status.enum";

export interface IAdvert {
    _id: string;
    title: string;
    brandId: string;
    modelId: string;
    year: number;
    region: string;
    city: string;
    description: string;
    price: number;
    status: AdvertStatusEnum;
    _ownerId: string;
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
    | "price"
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
        | "price"
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
