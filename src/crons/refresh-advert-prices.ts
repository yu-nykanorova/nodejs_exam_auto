import { CronJob } from "cron";

import { advertService } from "../services/advert.service";

const handler = async () => {
    try {
        await advertService.refreshAllAdvertsPrices();
    } catch (e) {
        console.error(e);
    }
};

export const refreshAdvertPrices = new CronJob("0 0 * * *", handler);
