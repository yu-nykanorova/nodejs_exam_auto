import * as Joi from "joi";
import { PASSWORD_REGEX } from "../constants/regEx.ts";

export  const passwordFormValidator = Joi.object({
    password: Joi.string()
        .regex(PASSWORD_REGEX)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.pattern.base":
                "Password must be 8-16 characters and contain uppercase, lowercase, number and special character",
            "any.required": "Password is required",
        }),

    confirmPassword: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .messages({
            "any.only": "Passwords do not match",
            "any.required": "Please repeat your password",
        }),
});