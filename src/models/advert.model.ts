import { model, Schema } from "mongoose";

import { AdvertStatusEnum } from "../enums/advert-status.enum";
import { IAdvert } from "../interfaces/advert.interface";
import { User } from "./user.model";

const advertSchema = new Schema(
    {
        title: { type: String, required: true },
        brand: { type: String, required: true },
        model: { type: String, required: true },
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
