import { model, Schema } from "mongoose";

import { IBrand } from "../interfaces/brand.interface";

const brandSchema = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Brand = model<IBrand>("brands", brandSchema);
