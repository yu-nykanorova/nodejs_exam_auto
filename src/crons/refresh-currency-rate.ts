import { CronJob } from "cron";

const handler = async () => {
    try {

    } catch (e) {
        console.error(e);
    }
};

export const refreshCurrencyRate = new CronJob("0 0 * * *", handler);
