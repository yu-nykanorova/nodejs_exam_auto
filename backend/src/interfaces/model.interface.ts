import { ModelRequestStatusEnum } from "../enums/model-request-status.enum";

export interface IModel {
    _id: string;
    name: string;
    brandId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IModelWithBrandName extends Omit<IModel, "brandId"> {
    brandId: {
        _id: string;
        name: string;
    };
}

export interface IModelCreateDTO {
    name: string;
    brandId: string;
}

export interface IModelRequest {
    _id: string;
    name: string;
    brandId: string;
    status: ModelRequestStatusEnum;
    _ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IModelRequestWithOwnerData extends Omit<
    IModelRequest,
    "_ownerId"
> {
    _ownerId: {
        _id: string;
        name: string;
        email: string;
    };
}

export interface IModelCreateRequestDTO {
    name: string;
    brandId: string;
}
