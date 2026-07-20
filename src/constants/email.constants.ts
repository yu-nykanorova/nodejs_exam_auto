import { EmailEnum } from "../enums/email.enum";

export type IEmailData = {
    subject: string;
    template: string;
};

export type IEmailConstants<T extends Record<string, string>> = {
    [K in keyof T]: IEmailData;
};

export const emailConstants: IEmailConstants<typeof EmailEnum> = {
    [EmailEnum.WELCOME]: {
        subject: "Welcome",
        template: "welcome",
    },
    [EmailEnum.FORGOT_PASSWORD]: {
        subject: "Forgot-password",
        template: "forgot-password",
    },
    [EmailEnum.CHECK_ADVERT]: {
        subject: "Check advert",
        template: "check-advert",
    },
};