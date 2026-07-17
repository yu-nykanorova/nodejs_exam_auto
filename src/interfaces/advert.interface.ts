import { AdvertStatusEnum } from "../enums/advert-status.enum";

export interface IAdvert {
    _id: string;
    title: string;
    description: string;
    price: number;
    status: AdvertStatusEnum;
    _ownerId: string;
    avatar?: string;
}

export type IAdvertCreateDTO = Pick<IAdvert, "title" | "description" | "price">;

export type IAdvertUpdateDTO = Partial<
    Pick<IAdvert, "title" | "description" | "price" | "avatar">
>;
