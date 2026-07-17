import { model, Schema } from "mongoose";

import { IOldHash } from "../interfaces/old-hash.interface";
import { User } from "./user.model";

const oldHashSchema = new Schema(
    {
        hash: { type: String, required: true },
        _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const OldHash = model<IOldHash>("old-hashes", oldHashSchema);
