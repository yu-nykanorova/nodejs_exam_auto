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
    [EmailEnum.WELCOME_MANAGER]: {
        subject: "Welcome, new manager",
        template: "welcome-manager",
    },
    [EmailEnum.FORGOT_PASSWORD]: {
        subject: "Forgot-password",
        template: "forgot-password",
    },
    [EmailEnum.CHECK_ADVERT]: {
        subject: "Check advert",
        template: "check-advert",
    },
    [EmailEnum.BRAND_REQUEST]: {
        subject: "Add new brand request",
        template: "brand-request",
    },
    [EmailEnum.MODEL_REQUEST]: {
        subject: "Add new model request",
        template: "model-request",
    },
};
