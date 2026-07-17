import { Filter } from "bad-words";

import { badWordsPatterns } from "../constants/badWordsList";

const filter = new Filter({ emptyList: true });

export const includesProfanity = (text: string): boolean => {
    const textToCheck = text.toLowerCase().trim();

    return (
        filter.isProfane(textToCheck) ||
        badWordsPatterns.some((pattern) => pattern.test(textToCheck))
    );
};
