import { model, Schema } from "mongoose";

import { IAdvertView } from "../interfaces/advert-view.interface";
import { Advert } from "./advert.model";

const advertViewSchema = new Schema(
    {
        _advertId: { type: Schema.Types.ObjectId, required: true, ref: Advert },
        count: { type: Number, required: true, default: 0 },
        date: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const AdvertView = model<IAdvertView>("advert-views", advertViewSchema);
