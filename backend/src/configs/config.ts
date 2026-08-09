import dotenv from "dotenv";

dotenv.config({ path: ".env" });

interface IConfig {
    PORT: number;
    MONGO_URI: string;
    FRONT_URL: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_ACCESS_LIFETIME: any;
    JWT_REFRESH_LIFETIME: any;
    SMTP_USER: string;
    SMTP_PASSWORD: string;
    ACTION_FORGOT_PASSWORD_SECRET: string;
    ACTION_CREATE_PASSWORD_SECRET: string;
    ACTION_FORGOT_PASSWORD_LIFETIME: any;
    ACTION_CREATE_PASSWORD_LIFETIME: any;
    PRIVATBANK_API_URL: string;
    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;
    AWS_ACCESS_KEY: string;
    AWS_SECRET_KEY: string;
    AWS_S3_BUCKET_NAME: string;
    AWS_S3_REGION: string;
    AWS_S3_ENDPOINT: string;
}

export function checkEnv(value: string | undefined, name: string): string {
    if (!value) {
        throw new Error(`Absent environment variable ${name}`);
    }
    return value;
}

export const config: IConfig = {
    PORT: Number(checkEnv(process.env.PORT, "PORT")),
    MONGO_URI: checkEnv(process.env.MONGO_URI, "MONGO_URI"),
    FRONT_URL: checkEnv(process.env.FRONT_URL, "FRONT_URL"),
    JWT_ACCESS_SECRET: checkEnv(
        process.env.JWT_ACCESS_SECRET,
        "JWT_ACCESS_SECRET",
    ),
    JWT_REFRESH_SECRET: checkEnv(
        process.env.JWT_REFRESH_SECRET,
        "JWT_REFRESH_SECRET",
    ),
    JWT_ACCESS_LIFETIME: checkEnv(
        process.env.JWT_ACCESS_LIFETIME,
        "JWT_ACCESS_LIFETIME",
    ),
    JWT_REFRESH_LIFETIME: checkEnv(
        process.env.JWT_REFRESH_LIFETIME,
        "JWT_REFRESH_LIFETIME",
    ),
    SMTP_USER: checkEnv(process.env.SMTP_USER, "SMTP_USER"),
    SMTP_PASSWORD: checkEnv(process.env.SMTP_PASSWORD, "SMTP_PASSWORD"),
    ACTION_FORGOT_PASSWORD_SECRET: checkEnv(
        process.env.ACTION_FORGOT_PASSWORD_SECRET,
        "ACTION_FORGOT_PASSWORD_SECRET",
    ),
    ACTION_CREATE_PASSWORD_SECRET: checkEnv(
        process.env.ACTION_CREATE_PASSWORD_SECRET,
        "ACTION_CREATE_PASSWORD_SECRET",
    ),
    ACTION_FORGOT_PASSWORD_LIFETIME: checkEnv(
        process.env.ACTION_FORGOT_PASSWORD_LIFETIME,
        "ACTION_FORGOT_PASSWORD_LIFETIME",
    ),
    ACTION_CREATE_PASSWORD_LIFETIME: checkEnv(
        process.env.ACTION_CREATE_PASSWORD_LIFETIME,
        "ACTION_CREATE_PASSWORD_LIFETIME",
    ),
    PRIVATBANK_API_URL: checkEnv(
        process.env.PRIVATBANK_API_URL,
        "PRIVBANK_API_URL",
    ),
    ADMIN_EMAIL: checkEnv(process.env.ADMIN_EMAIL, "ADMIN_EMAIL"),
    ADMIN_PASSWORD: checkEnv(process.env.ADMIN_PASSWORD, "ADMIN_PASSWORD"),

    AWS_ACCESS_KEY: checkEnv(process.env.AWS_ACCESS_KEY, "AWS_ACCESS_KEY"),
    AWS_SECRET_KEY: checkEnv(process.env.AWS_SECRET_KEY, "AWS_SECRET_KEY"),
    AWS_S3_BUCKET_NAME: checkEnv(
        process.env.AWS_S3_BUCKET_NAME,
        "AWS_S3_BUCKET_NAME",
    ),
    AWS_S3_REGION: checkEnv(process.env.AWS_S3_REGION, "AWS_S3_REGION"),
    AWS_S3_ENDPOINT: checkEnv(process.env.AWS_S3_ENDPOINT, "AWS_S3_ENDPOINT"),
};
