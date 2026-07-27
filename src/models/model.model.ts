import { model, Schema } from "mongoose";

import { IModel } from "../interfaces/model.interface";
import { Brand } from "./brand.model";

const modelSchema = new Schema(
    {
        name: { type: String, required: true },
        brandId: { type: Schema.Types.ObjectId, required: true, ref: Brand },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Model = model<IModel>("models", modelSchema);
