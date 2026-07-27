import { ModelRequestStatusEnum } from "../enums/model-request-status.enum";

export interface IModel {
    _id: string;
    name: string;
    brandId: string;
    createdAt: Date;
    updatedAt: Date;
}

export type IModelCreateDTO = Pick<IModel, "name" | "brandId">;

export interface IModelRequest {
    _id: string;
    name: string;
    brandId: string;
    status: ModelRequestStatusEnum;
    _ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}