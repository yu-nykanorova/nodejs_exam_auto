import { Filter } from "bad-words";

import { badWordsPatterns } from "../constants/bad-words-list.constants";

const filter = new Filter();

export const includesProfanity = (text: string): boolean => {
    const wordsToCheck = text
        .toLowerCase()
        .split(/[^\p{L}]+/u)
        .filter(Boolean);

    return (
        filter.isProfane(wordsToCheck.join(" ")) ||
        wordsToCheck.some((word) =>
            badWordsPatterns.some((pattern) => pattern.test(word)),
        )
    );
};
