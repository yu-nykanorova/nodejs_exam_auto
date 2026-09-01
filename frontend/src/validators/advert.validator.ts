import * as Joi from "joi";
import { Currencies } from "../constants/currencies.ts";

export const advertCreateValidator = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.empty": "Title is required",
            "string.min": "Title must be at least 3 characters",
            "string.max": "Title must be at most 100 characters",
        }),

    brandId: Joi.string()
        .required()
        .messages({
            "string.empty": "Brand is required",
            "any.required": "Brand is required",
        }),

    modelId: Joi.string()
        .required()
        .messages({
            "string.empty": "Model is required",
            "any.required": "Model is required",
        }),

    year: Joi.number()
        .integer()
        .min(1900)
        .max(new Date().getFullYear())
        .required()
        .messages({
            "number.base": "Year must be a number",
            "number.integer": "Year must be an integer",
            "number.min": "Year must be at least 1900",
            "number.max": "Year cannot be in the future",
            "any.required": "Year is required",
        }),

    region: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Region is required",
        }),

    city: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "City is required",
        }),

    description: Joi.string()
        .trim()
        .min(10)
        .max(2000)
        .required()
        .messages({
            "string.empty": "Description is required",
            "string.min": "Description must be at least 10 characters",
            "string.max": "Description must be at most 2000 characters",
        }),

    initialPrice: Joi.number()
        .positive()
        .required()
        .messages({
            "number.base": "Price must be a number",
            "number.positive": "Price must be greater than 0",
            "any.required": "Price is required",
        }),

    initialCurrency: Joi.string()
        .valid(...Object.values(Currencies))
        .required()
        .messages({
            "any.only": "Select a valid currency",
            "any.required": "Currency is required",
        }),
});