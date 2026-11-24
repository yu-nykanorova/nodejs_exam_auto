import * as Joi from "joi";
import { NAME_REGEX, PHONE_REGEX } from "../constants/regEx.ts";

export const updateProfileValidator = (isSeller: boolean) =>Joi.object({
    email: Joi.string()
        .trim()
        .email({ tlds: { allow: false } })
        .messages({
            "string.base": "Email must be a string",
            "string.empty": "Email cannot be empty",
            "string.email": "Please enter a valid email address",
        }),

    name: Joi.string()
        .trim()
        .regex(NAME_REGEX)
        .messages({
            "string.base": "Name must be a string",
            "string.empty": "Name is required",
            "string.pattern.base":
                "Name can only contain letters, and a single hyphen or apostrophe in the middle",

        }),

    surname: Joi.string()
        .trim()
        .regex(NAME_REGEX)
        .messages({
            "string.base": "Name must be a string",
            "string.empty": "Name is required",
            "string.pattern.base":
                "Name can only contain letters, and a single hyphen or apostrophe in the middle",

        }),

    age: Joi.number()
        .integer()
        .min(2)
        .max(100)
        .messages({
            "number.base": "Age must be a number",
            "number.integer": "Age must be an integer",
            "number.min": "Minimum age is 2",
            "number.max": "Maximum age is 100",
        }),

    phone: isSeller
        ? Joi.string()
            .trim()
            .regex(PHONE_REGEX)
            .required()
            .messages({
                "string.empty": "Phone is required",
                "string.pattern.base": "Enter a valid Ukrainian phone number, e.g. +380971234567 or 0971234567",
            })
        : Joi.string()
            .trim()
            .allow("")
            .regex(PHONE_REGEX)
            .messages({
                "string.pattern.base": "Enter a valid Ukrainian phone number, e.g. +380971234567 or 0971234567"
            }),
});

