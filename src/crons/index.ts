import { removeOldHashesCronJob } from "./remove-old-hashes";
//import { recalculateAdvertPrices } from "./recalculate-advert-prices";

export const cronRunner = () => {
    removeOldHashesCronJob.start();
    //recalculateAdvertPrices.start();
};
