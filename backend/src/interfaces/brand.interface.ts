import { BrandRequestStatusEnum } from "../enums/brand-request-status.enum";

export interface IBrand {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IBrandCreateDTO {
    name: string;
}

export interface IBrandCreateRequestDTO {
    name: string;
}

export interface IBrandRequest {
    _id: string;
    name: string;
    status: BrandRequestStatusEnum;
    _ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}
