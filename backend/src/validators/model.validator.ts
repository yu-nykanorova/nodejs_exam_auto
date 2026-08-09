import joi from "joi";

import { ModelRequestStatusEnum } from "../enums/model-request-status.enum";

export class ModelValidator {
    private static name = joi.string().min(2).max(20).trim();
    private static brandName = joi.string().min(2).max(20).trim();
    private static brandId = joi.string().trim();
    private static status = joi
        .string()
        .valid(...Object.values(ModelRequestStatusEnum));

    public static createModel = joi.object({
        name: this.name.required(),
        brandId: this.brandId.required(),
    });

    public static createModelRequest = joi.object({
        name: this.name.required(),
        brandName: this.brandName.required(),
    });

    public static updateModelRequestStatus = joi.object({
        status: this.status.required(),
    });
}
