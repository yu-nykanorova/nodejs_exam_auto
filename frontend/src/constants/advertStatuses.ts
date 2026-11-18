export const advertStatuses = {
    PENDING: "PENDING",
    ACTIVE: "ACTIVE",
    BLOCKED: "BLOCKED",
    DELETED: "DELETED",
    SOLD: "SOLD",
} as const;

export type AdvertStatus = typeof advertStatuses[keyof typeof advertStatuses];