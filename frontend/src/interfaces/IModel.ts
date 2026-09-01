import type { RequestStatus } from "./IRequestStatus.ts";

export interface IModel {
    _id: string;
    name: string;
    brandId: string;
    createdAt: string;
    updatedAt: string;
}

export interface IModelCreate {
    name: string;
    brandId: string;
}

export interface IModelRequest {
    _id: string;
    name: string;
    brandId: string;
    status: RequestStatus;
    _ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}