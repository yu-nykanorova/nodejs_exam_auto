import type { AdvertStatus } from "../interfaces/IAdvert.ts";

export const ADVERT_STATUS_CLASS: Record<AdvertStatus, string> = {
    ACTIVE: "bg-green-100",
    PENDING: "bg-yellow-200",
    BLOCKED: "bg-red-200",
    DELETED: "bg-gray-200",
    SOLD: "bg-blue-200",
}