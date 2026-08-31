import { PASSWORD_REGEX } from "../constants/regEx.ts";
import * as Joi from "joi";

export const signUpValidator = (isSeller: boolean) =>
    Joi.object({
        email: Joi.string()
            .email()
            .trim()
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
            .pattern(
                /^[A-Za-zА-Яа-яІіЇїЄєҐґ]+(?:[-'][A-Za-zА-Яа-яІіЇїЄєҐґ]+)?$/,
            )
            .trim()
            .required()
            .messages({
                "string.empty": "Name is required",
                "string.pattern.base": "Invalid name",
            }),

        surname: Joi.string()
            .pattern(
                /^[A-Za-zА-Яа-яІіЇїЄєҐґ]+(?:[-'][A-Za-zА-Яа-яІіЇїЄєҐґ]+)?$/,
            )
            .trim()
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
                .pattern(/^\+?[0-9]{10,15}$/)
                .required()
                .messages({
                    "string.empty": "Phone is required",
                    "string.pattern.base": "Invalid phone number",
                })
            : Joi.string()
                .pattern(/^\+?[0-9]{10,15}$/)
                .allow("")
                .messages({
                    "string.pattern.base": "Invalid phone number",
                }),
    });