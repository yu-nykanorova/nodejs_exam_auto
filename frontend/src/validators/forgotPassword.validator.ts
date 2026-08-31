import * as Joi from "joi";

export const forgotPasswordValidator = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .trim()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Enter a valid email",
        }),
});