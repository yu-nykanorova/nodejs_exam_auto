import joi from "joi";

import { AdvertQueryOrderEnum } from "../enums/advert-query-order.enum";
import { queryValidator } from "./query.validator";

export class UserValidator {
    private static title = joi.string().min(10).max(100).trim();
    private static description = joi.string().min(50).trim();
    private static price = joi.number().min(0);

    public static create = joi.object({
        title: this.title.required(),
        description: this.description.required(),
        price: this.price.required(),
    });

    public static update = joi.object({
        title: this.title,
        description: this.description,
        price: this.price,
    });

    public static query = queryValidator(AdvertQueryOrderEnum);
}
