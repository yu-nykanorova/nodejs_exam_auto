import { removeOldHashesCronJob } from "./remove-old-hashes";

export const cronRunner = () => {
    removeOldHashesCronJob.start();
};
