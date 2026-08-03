import { CronJob } from "cron";

import { timeHelper } from "../helpers/time.helper";
import { oldHashesRepository } from "../repositories/old-hashes.repository";

const handler = async () => {
    try {
        const date = timeHelper.substractByParams(180, "days");
        const deletedCount = await oldHashesRepository.deleteOlderThan(date);
        console.log(`Deleted ${deletedCount} old password hashes`);
    } catch (e) {
        console.error(e);
    }
};

export const removeOldHashesCronJob = new CronJob("0 0 * 1/6 *", handler);
