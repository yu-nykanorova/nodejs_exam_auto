import * as Joi from "joi";
import { Currencies } from "../constants/currencies.ts";
import { advertsSortOrder } from "../constants/advertSortOrder.ts";

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

export const advertUpdateValidator = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .empty("")
        .messages({
            "string.min": "Title must be at least 3 characters",
            "string.max": "Title must be at most 100 characters",
        }),

    brandId: Joi.string().empty(""),

    modelId: Joi.string().empty(""),

    year: Joi.number()
        .integer()
        .min(1900)
        .max(new Date().getFullYear())
        .empty("")
        .messages({
            "number.base": "Year must be a number",
            "number.integer": "Year must be an integer",
            "number.min": "Year must be at least 1900",
            "number.max": "Year cannot be in the future",
        }),

    region: Joi.string()
        .trim()
        .empty(""),

    city: Joi.string()
        .trim()
        .empty(""),

    description: Joi.string()
        .trim()
        .min(10)
        .max(2000)
        .empty("")
        .messages({
            "string.min": "Description must be at least 10 characters",
            "string.max": "Description must be at most 2000 characters",
        }),

    initialPrice: Joi.number()
        .positive()
        .empty("")
        .messages({
            "number.base": "Price must be a number",
            "number.positive": "Price must be greater than 0",
        }),

    initialCurrency: Joi.string()
        .valid(...Object.values(Currencies))
        .empty("")
        .messages({
            "any.only": "Select a valid currency",
        }),
});

export const advertFilterValidator = Joi.object({
    title: Joi.string()
        .trim()
        .max(100)
        .messages({
            "string.max": "Title must be at most 100 characters",
        })
        .empty(""),

    brandId: Joi.string().empty(""),

    modelId: Joi.string().empty(""),

    yearFrom: Joi.number()
        .integer()
        .min(1900)
        .max(new Date().getFullYear())
        .empty("")
        .when("yearTo", {
            is: Joi.number().required(),
            then: Joi.number().max(Joi.ref("yearTo")),
        })
        .messages({
            "number.base": "Year must be a number",
            "number.integer": "Year must be an integer",
            "number.min": "Year must be at least 1900",
            "number.max": "Year from cannot be in the future or greater than year to",
        }),

    yearTo: Joi.number()
        .integer()
        .min(1900)
        .max(new Date().getFullYear())
        .empty("")
        .messages({
            "number.base": "Year must be a number",
            "number.integer": "Year must be an integer",
            "number.min": "Year must be at least 1900",
            "number.max": "Year to cannot be in the future",
        }),

    region: Joi.string()
        .trim()
        .max(30)
        .empty("")
        .messages({
            "string.max": "Region name must be at most 30 characters",
        }),

    city: Joi.string()
        .trim()
        .max(30)
        .empty("")
        .messages({
            "string.max": "City name must be at most 30 characters",
        }),

    priceFrom: Joi.number()
        .positive()
        .empty("")
        .when("priceTo", {
            is: Joi.number().required(),
            then: Joi.number().max(Joi.ref("priceTo")),
        })
        .messages({
            "number.base": "Price must be a number",
            "number.positive": "Price must be greater than 0",
            "number.max": "Minimum price cannot exceed maximum price",
        }),

    priceTo: Joi.number()
        .positive()
        .empty("")
        .messages({
            "number.base": "Price must be a number",
            "number.positive": "Price must be greater than 0",
        }),

    currency: Joi.string()
        .valid(...Object.values(Currencies))
        .default(Currencies.USD)
        .empty("")
        .messages({
            "any.only": "Select a valid currency",
        }),

    order: Joi.string()
        .default(`-${ advertsSortOrder.CREATED_AT }`),

});