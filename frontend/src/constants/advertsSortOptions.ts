import { advertsSortOrder } from "./advertSortOrder.ts";

export const advertSortOptions = [
    {value: `-${advertsSortOrder.CREATED_AT}`, label: "Newest adverts first"},
    {value: advertsSortOrder.CREATED_AT, label: "Oldest adverts first"},
    {value: `-${advertsSortOrder.TITLE}`, label: "Title (Z-A)"},
    {value: advertsSortOrder.TITLE, label: "Title (A-Z)"},
    {value: `-${advertsSortOrder.PRICE}`, label: "Price: high to low"},
    {value: advertsSortOrder.PRICE, label: "Price: low to high"},
    {value: `-${advertsSortOrder.YEAR}`, label: "Newest cars first"},
    {value: advertsSortOrder.YEAR, label: "Oldest cars first"},
] as const;

export type AdvertsOrder = typeof advertSortOptions[number]["value"];