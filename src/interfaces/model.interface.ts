import { ModelRequestStatusEnum } from "../enums/model-request-status.enum";

export interface IModel {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export type IModelCreateDTO = Pick<IModel, "name">;

export interface IModelRequest {
    _id: string;
    name: string;
    status: ModelRequestStatusEnum;
    _ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}