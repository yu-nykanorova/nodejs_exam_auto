import joi from "joi";

import { AdvertQueryOrderEnum } from "../enums/advert-query-order.enum";
import { queryValidator } from "./query.validator";

export class AdvertValidator {
    private static title = joi.string().min(10).max(100).trim();
    private static description = joi.string().min(50).trim();
    private static price = joi.number().min(0);
    private static brand = joi.string().trim();
    private static model = joi.string().trim();
    private static year = joi.number().min(1920).max(new Date().getFullYear());
    private static city = joi.string().min(3).max(30).trim();
    private static region = joi.string().min(3).max(30).trim();

    public static create = joi.object({
        title: this.title.required(),
        description: this.description.required(),
        price: this.price.required(),
        brand: this.brand.required(),
        model: this.model.required(),
        year: this.year.required(),
        city: this.city.required(),
        region: this.region.required(),
    });

    public static update = joi.object({
        title: this.title,
        description: this.description,
        price: this.price,
        brand: this.brand,
        model: this.model,
        year: this.year,
        city: this.city,
        region: this.region,
    });

    public static query = queryValidator(AdvertQueryOrderEnum, {
        brand: this.brand,
        model: this.model,
        year: this.year,
        city: this.city,
        region: this.region,
    });
}
