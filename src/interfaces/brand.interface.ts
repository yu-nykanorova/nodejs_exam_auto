import { BrandRequestStatusEnum } from "../enums/brand-request-status.enum";

export interface IBrand {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export type IBrandCreateDTO = Pick<IBrand, "name">;

export interface IBrandRequest {
    _id: string;
    name: string;
    status: BrandRequestStatusEnum;
    _ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}
