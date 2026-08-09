import joi from "joi";

import { BrandRequestStatusEnum } from "../enums/brand-request-status.enum";

export class BrandValidator {
    private static name = joi.string().min(2).max(20).trim();

    private static status = joi
        .string()
        .valid(...Object.values(BrandRequestStatusEnum));

    public static create = joi.object({
        name: this.name.required(),
    });

    public static updateBrandRequestStatus = joi.object({
        status: this.status.required(),
    });
}
