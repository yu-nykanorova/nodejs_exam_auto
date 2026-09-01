import type { RequestStatus } from "./IRequestStatus.ts";

export interface IBrand {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface IBrandCreate {
    name: string;
}

export interface IBrandRequest {
    _id: string;
    name: string;
    status: RequestStatus;
    _ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}