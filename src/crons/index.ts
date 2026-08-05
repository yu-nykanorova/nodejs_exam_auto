import { refreshAdvertPrices } from "./refresh-advert-prices";
import { removeDeletedUsersByDateCronJob } from "./remove-deleted-users-by-date";
import { removeOldHashesCronJob } from "./remove-old-hashes";
//import { recalculateAdvertPrices } from "./recalculate-advert-prices";

export const cronRunner = () => {
    removeOldHashesCronJob.start();
    refreshAdvertPrices.start();
    removeDeletedUsersByDateCronJob.start();
};
