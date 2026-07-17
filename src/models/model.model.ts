import { model, Schema } from "mongoose";

import { IModel } from "../interfaces/model.interface";

const modelSchema = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Model = model<IModel>("models", modelSchema);
