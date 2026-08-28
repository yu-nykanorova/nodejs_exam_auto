export const roles = {
    ADMIN: "admin",
    MANAGER: "manager",
    SELLER: "seller",
    BUYER: "buyer",
} as const;

export type Role = typeof roles[keyof typeof roles];