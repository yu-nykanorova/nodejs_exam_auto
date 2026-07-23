import { model, Schema } from "mongoose";

import { AdvertStatusEnum } from "../enums/advert-status.enum";
import { IAdvert } from "../interfaces/advert.interface";
import { Brand } from "./brand.model";
import { Model } from "./model.model";
import { User } from "./user.model";

const advertSchema = new Schema(
    {
        title: { type: String, required: true },
        brandId: { type: Schema.Types.ObjectId, ref: Brand, required: true },
        modelId: { type: Schema.Types.ObjectId, ref: Model, required: true },
        year: { type: Number, required: true },
        city: { type: String, required: true },
        region: { type: String, required: true },
        description: { type: String, required: true },
        avatar: { type: String, default: "" },
        price: { type: Number, required: true },
        status: {
            type: String,
            enum: AdvertStatusEnum,
            required: true,
        },
        _ownerId: { type: Schema.Types.ObjectId, required: true, ref: User },
        viewsCount: { type: Number, default: 0 },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Advert = model<IAdvert>("adverts", advertSchema);
