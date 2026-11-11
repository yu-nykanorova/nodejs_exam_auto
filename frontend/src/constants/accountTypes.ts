export const sellerAccountTypes = {
    BASIC: "BASIC",
    PREMIUM: "PREMIUM",
} as const;

export type AccountType = typeof sellerAccountTypes[keyof typeof sellerAccountTypes];