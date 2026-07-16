import { AdvertStatusEnum } from "../enums/advert-status.enum";

export interface IAdvert {
    _id: string;
    name: string;
    description: string;
    price: number;
    status: AdvertStatusEnum;
    _ownerId: string;
    avatar?: string;
}

export type IAdvertCreateDTO = Pick<IAdvert, "name" | "description" | "price">;

export type IAdvertUpdateDTO = Partial<
    Pick<IAdvert, "name" | "description" | "price" | "avatar">
>;
