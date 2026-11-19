export const userStatuses = {
    ACTIVE: "ACTIVE",
    BLOCKED: "BLOCKED",
    DELETED: "DELETED",
} as const;

export type UserStatus = typeof userStatuses[keyof typeof userStatuses];