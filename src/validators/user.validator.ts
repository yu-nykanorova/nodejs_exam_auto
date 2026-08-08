import joi from "joi";

import { AccountTypeEnum } from "../enums/account-type.enum";
import { RegexEnum } from "../enums/regex.enum";
import { UserQueryOrderEnum } from "../enums/user-query-order.enum";
import { UserStatusEnum } from "../enums/user-status.enum";
import { queryValidator } from "./query.validator";

export class UserValidator {
    private static email = joi.string().email().trim();
    private static password = joi.string().regex(RegexEnum.PASSWORD);
    private static name = joi.string().regex(RegexEnum.NAME).trim();
    private static surname = joi.string().regex(RegexEnum.NAME).trim();
    private static age = joi.number().min(2).max(100);
    private static status = joi
        .string()
        .valid(...Object.values(UserStatusEnum));
    private static phone = joi.string().pattern(/^\+?[0-9]{10,15}$/);
    private static accountType = joi
        .string()
        .valid(...Object.values(AccountTypeEnum));

    public static create = joi.object({
        email: this.email.required(),
        password: this.password.required(),
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
        phone: this.phone,
    });

    public static createSeller = joi.object({
        email: this.email.required(),
        password: this.password.required(),
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
        phone: this.phone.required(),
    });

    public static createManager = joi.object({
        email: this.email.required(),
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });

    public static update = joi.object({
        email: this.email,
        password: this.password,
        oldPassword: this.password,
        name: this.name,
        surname: this.surname,
        age: this.age,
        phone: this.phone,
    });

    public static login = joi.object({
        email: this.email.required(),
        password: this.password.required(),
    });

    public static sendEmail = joi.object({
        email: this.email.required(),
    });

    public static setNewPassword = joi
        .object({
            password: this.password.required(),
        })
        .unknown(true);

    public static query = queryValidator(UserQueryOrderEnum);

    public static changeStatus = joi.object({
        status: this.status.required(),
    });

    public static updateAccountType = joi.object({
        accountType: this.accountType.required(),
    });
}
