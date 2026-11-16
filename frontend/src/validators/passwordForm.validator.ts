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
});