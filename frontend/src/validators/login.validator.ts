import * as Joi from "joi";
import { PASSWORD_REGEX } from "../constants/regEx.ts";

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
        .regex(PASSWORD_REGEX)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.pattern.base":
                "Password must be 8-16 characters and contain uppercase, lowercase, number and special character",
            "any.required": "Password is required",
        }),
});
