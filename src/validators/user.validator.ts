import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";
import { UserQueryOrderEnum } from "../enums/user-query-order.enum";
import { queryValidator } from "./query.validator";

export class UserValidator {
    private static email = joi.string().email().trim();
    private static password = joi.string().regex(RegexEnum.PASSWORD);
    private static name = joi.string().regex(RegexEnum.NAME).trim();
    private static surname = joi.string().regex(RegexEnum.NAME).trim();
    private static age = joi.number().min(2).max(100);

    public static create = joi.object({
        email: this.email.required(),
        password: this.password.required(),
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });

    public static update = joi.object({
        email: this.email,
        password: this.password,
        name: this.name,
        surname: this.surname,
        age: this.age,
    });

    public static setNewPassword = joi
        .object({
            password: this.password.required(),
        })
        .unknown(true);

    public static query = queryValidator(UserQueryOrderEnum);
}
