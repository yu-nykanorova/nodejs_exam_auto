export const advertsSortOrder = {
    TITLE: "title",
    PRICE: "price",
    CREATED_AT: "createdAt",
    YEAR: "year",
} as const;

export type AdvertsSortOrder = typeof advertsSortOrder[keyof typeof advertsSortOrder];

export type AdvertsSortOrderFull = AdvertsSortOrder | `-${AdvertsSortOrder}`;