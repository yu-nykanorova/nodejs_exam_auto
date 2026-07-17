import { model, Schema } from "mongoose";

import { AdvertStatusEnum } from "../enums/advert-status.enum";
import { IAdvert } from "../interfaces/advert.interface";
import { User } from "./user.model";

const advertSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        avatar: { type: String, default: "" },
        price: { type: Number, required: true },
        status: {
            type: String,
            enum: AdvertStatusEnum,
            required: true,
        },
        _ownerId: { type: Schema.Types.ObjectId, required: true, ref: User },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Advert = model<IAdvert>("adverts", advertSchema);
