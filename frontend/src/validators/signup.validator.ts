import { NAME_REGEX, PASSWORD_REGEX, PHONE_REGEX } from "../constants/regEx.ts";
import * as Joi from "joi";

export const signUpValidator = (isSeller: boolean) =>
    Joi.object({
        email: Joi.string()
            .trim()
            .email({ tlds: { allow: false } })
            .required()
            .messages({
                "string.empty": "Email is required",
                "string.email": "Enter a valid email",
            }),

        password: Joi.string()
            .regex(PASSWORD_REGEX)
            .required()
            .messages({
                "string.empty": "Password is required",
                "string.pattern.base":
                    "Password must be 8-16 characters and contain uppercase, lowercase, number and special character",
            }),

        confirmPassword: Joi.any()
            .valid(Joi.ref("password"))
            .required()
            .messages({
                "any.only": "Passwords do not match",
                "any.required": "Please repeat your password",
            }),

        name: Joi.string()
            .trim()
            .regex(NAME_REGEX)
            .required()
            .messages({
                "string.empty": "Name is required",
                "string.pattern.base": "Invalid name",
            }),

        surname: Joi.string()
            .trim()
            .regex(NAME_REGEX)
            .required()
            .messages({
                "string.empty": "Surname is required",
                "string.pattern.base": "Invalid surname",
            }),

        age: Joi.number()
            .min(2)
            .max(100)
            .required()
            .messages({
                "number.base": "Age must be a number",
                "number.min": "Age must be at least 2",
                "number.max": "Age must be at most 100",
                "any.required": "Age is required",
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
                .empty("")
                .regex(PHONE_REGEX)
                .messages({
                    "string.pattern.base": "Enter a valid Ukrainian phone number, e.g. +380971234567 or 0971234567",
                }),
    });