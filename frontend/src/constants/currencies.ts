export const Currencies = {
    USD: "USD",
    UAH: "UAH",
    EUR: "EUR",
} as const;

export type Currency = typeof Currencies[keyof typeof Currencies];

