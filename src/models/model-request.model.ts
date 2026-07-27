import { model, Schema } from "mongoose";

import { ModelRequestStatusEnum } from "../enums/model-request-status.enum";
import { IModelRequest } from "../interfaces/model.interface";
import { Brand } from "./brand.model";
import { User } from "./user.model";

const modelRequestSchema = new Schema(
    {
        name: { type: String, required: true },
        brandId: { type: Schema.Types.ObjectId, required: true, ref: Brand },
        status: {
            type: String,
            enum: ModelRequestStatusEnum,
            required: true,
        },
        _ownerId: { type: Schema.Types.ObjectId, required: true, ref: User },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const ModelRequest = model<IModelRequest>(
    "model-requests",
    modelRequestSchema,
);
