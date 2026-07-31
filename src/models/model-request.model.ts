import { model, Schema } from "mongoose";

import { ModelRequestStatusEnum } from "../enums/model-request-status.enum";
import { IModelRequest } from "../interfaces/model.interface";
import { User } from "./user.model";

const modelRequestSchema = new Schema(
    {
        name: { type: String, required: true },
        brandName: { type: String, required: true },
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
