import * as Joi from "joi";
import { NAME_REGEX } from "../constants/regEx.ts";

export const createManagerValidator = Joi.object({
    email: Joi.string()
        .email()
        .trim()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Enter a valid email",
            "any.required": "Email is required",
        }),

    name: Joi.string()
        .regex(NAME_REGEX)
        .trim()
        .required()
        .messages({
            "string.empty": "Name is required",
            "string.pattern.base":
                "Name must contain only letters",
            "any.required": "Name is required",
        }),

    surname: Joi.string()
        .regex(NAME_REGEX)
        .trim()
        .required()
        .messages({
            "string.empty": "Surname is required",
            "string.pattern.base":
                "Surname must contain only letters",
            "any.required": "Surname is required",
        }),

    age: Joi.number()
        .min(2)
        .max(100)
        .required()
        .messages({
            "number.base": "Age must be a number",
            "number.min": "Age must be at least 2",
            "number.max": "Age must be no more than 100",
            "any.required": "Age is required",
        }),
});