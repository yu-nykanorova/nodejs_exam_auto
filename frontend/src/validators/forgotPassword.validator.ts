import * as Joi from "joi";

export const forgotPasswordValidator = Joi.object({
    email: Joi.string()
        .trim()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Enter a valid email",
        }),
});