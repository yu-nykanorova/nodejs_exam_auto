import { model, Schema } from "mongoose";

import { AccountTypeEnum } from "../enums/account-type.enum";
import { UserRoleEnum } from "../enums/user-role.enum";
import { UserStatusEnum } from "../enums/user-status.enum";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, default: undefined },
        role: {
            enum: UserRoleEnum,
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: UserStatusEnum,
            required: true,
            default: UserStatusEnum.ACTIVE,
        },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        age: { type: Number, required: true },
        phone: { type: String, default: "" },
        avatar: { type: String, default: "" },
        accountType: { type: String, enum: AccountTypeEnum },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const User = model<IUser>("users", userSchema);
