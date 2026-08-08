import joi from "joi";

import { AdvertQueryOrderEnum } from "../enums/advert-query-order.enum";
import { CurrencyEnum } from "../enums/currency.enum";
import { queryValidator } from "./query.validator";

export class AdvertValidator {
    private static title = joi.string().min(10).max(100).trim();
    private static description = joi.string().min(50).trim();
    private static initialPrice = joi.number().min(0);
    private static initialCurrency = joi
        .string()
        .valid(...Object.values(CurrencyEnum));
    private static brandId = joi.string().trim();
    private static modelId = joi.string().trim();
    private static year = joi.number().min(1920).max(new Date().getFullYear());
    private static city = joi.string().min(3).max(30).trim();
    private static region = joi.string().min(3).max(30).trim();

    public static create = joi.object({
        title: this.title.required(),
        description: this.description.required(),
        initialPrice: this.initialPrice.required(),
        initialCurrency: this.initialCurrency.required(),
        brandId: this.brandId.required(),
        modelId: this.modelId.required(),
        year: this.year.required(),
        city: this.city.required(),
        region: this.region.required(),
    });

    public static update = joi.object({
        title: this.title,
        description: this.description,
        initialPrice: this.initialPrice,
        initialCurrency: this.initialCurrency,
        brandId: this.brandId,
        modelId: this.modelId,
        year: this.year,
        city: this.city,
        region: this.region,
    });

    public static query = queryValidator(AdvertQueryOrderEnum, {
        brandId: this.brandId,
        modelId: this.modelId,
        year: this.year,
        city: this.city,
        region: this.region,
    });
}
