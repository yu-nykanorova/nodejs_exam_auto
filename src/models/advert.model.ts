import { model, Schema } from "mongoose";

import { AdvertStatusEnum } from "../enums/advert-status.enum";
import { CurrencyEnum } from "../enums/currency.enum";
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
        photo: { type: String, default: "" },
        initialPrice: { type: Number, required: true },
        initialCurrency: { type: String, enum: CurrencyEnum, required: true },
        priceUAH: { type: Number, required: true },
        priceUSD: { type: Number, required: true },
        priceEUR: { type: Number, required: true },
        exchangeRate: {
            USD: { type: Number, required: true },
            EUR: { type: Number, required: true },
        },
        status: {
            type: String,
            enum: AdvertStatusEnum,
            required: true,
        },
        _ownerId: { type: Schema.Types.ObjectId, required: true, ref: User },
        viewsCount: { type: Number, default: 0 },
        attemptModerate: { type: Number, default: 0 },
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Advert = model<IAdvert>("adverts", advertSchema);
