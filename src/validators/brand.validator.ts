import joi from "joi";

export class BrandValidator {
    private static name = joi.string().min(2).max(20).trim();

    public static create = joi.object({
        name: this.name.required(),
    });
}
