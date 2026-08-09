import { model, Schema } from "mongoose";

import { BrandRequestStatusEnum } from "../enums/brand-request-status.enum";
import { IBrandRequest } from "../interfaces/brand.interface";
import { User } from "./user.model";

const brandRequestSchema = new Schema(
    {
        name: { type: String, required: true },
        status: {
            type: String,
            enum: BrandRequestStatusEnum,
            required: true,
        },
        _ownerId: { type: Schema.Types.ObjectId, required: true, ref: User },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const BrandRequest = model<IBrandRequest>(
    "brand-requests",
    brandRequestSchema,
);
