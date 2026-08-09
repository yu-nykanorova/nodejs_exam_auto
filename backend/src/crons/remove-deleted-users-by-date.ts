import { CronJob } from "cron";

import { timeHelper } from "../helpers/time.helper";
import { userService } from "../services/user.service";

const handler = async () => {
    try {
        const date = timeHelper.substractByParams(365, "days");
        const deletedCount = await userService.cleanUsersArchiveByDate(date);
        console.log(`Removed ${deletedCount} archived users`);
    } catch (e) {
        console.error(e);
    }
};

export const removeDeletedUsersByDateCronJob = new CronJob(
    "0 0 * 1 *",
    handler,
);
