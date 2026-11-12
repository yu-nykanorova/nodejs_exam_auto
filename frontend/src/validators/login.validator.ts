import * as Joi from "joi";

export const loginValidator = Joi.object({
    email: Joi.string()
        .email()
        .trim()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Enter a valid email",
            "any.required": "Email is required",
        }),

    password: Joi.string()
        .required()
        .messages({
            "string.empty": "Password is required",
            "any.required": "Password is required",
        }),
});
