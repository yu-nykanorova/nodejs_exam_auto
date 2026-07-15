import dotenv from "dotenv";

dotenv.config({ path: ".env" });

interface IConfig {
    PORT: number;
    MONGO_URI: string;
    FRONT_URL: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    EMAIL_USER: string;
    EMAIL_PASSWORD: string;
    ACTION_FORGOT_PASSWORD_SECRET: string;
    ACTION_CREATE_PASSWORD_SECRET: string;
}

export function checkEnv(value: string | undefined, name: string): string {
    if (!value) {
        throw new Error(`Absent environment variable ${name}`);
    }
    return value;
}

export const config: IConfig = {
    PORT: Number(checkEnv(process.env.PORT, "PORT")) || 3001,
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
    EMAIL_USER: checkEnv(process.env.EMAIL_USER, "EMAIL_USER"),
    EMAIL_PASSWORD: checkEnv(process.env.EMAIL_PASSWORD, "EMAIL_PASSWORD"),
    ACTION_FORGOT_PASSWORD_SECRET: checkEnv(
        process.env.ACTION_FORGOT_PASSWORD_SECRET,
        "ACTION_FORGOT_PASSWORD_SECRET",
    ),
    ACTION_CREATE_PASSWORD_SECRET: checkEnv(
        process.env.ACTION_CREATE_PASSWORD_SECRET,
        "ACTION_CREATE_PASSWORD_SECRET",
    ),
};
