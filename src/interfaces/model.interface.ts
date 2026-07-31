import { ModelRequestStatusEnum } from "../enums/model-request-status.enum";

export interface IModel {
    _id: string;
    name: string;
    brandId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IModelCreateDTO {
    name: string;
    brandId: string;
}

export interface IModelCreateRequestDTO {
    name: string;
    brandName: string;
}

export interface IModelRequest {
    _id: string;
    name: string;
    brandName: string;
    status: ModelRequestStatusEnum;
    _ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}
