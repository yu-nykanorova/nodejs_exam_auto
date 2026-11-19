import type { UserStatus } from "./userStatuses.ts";

export const USER_STATUS_CLASS: Record<UserStatus, string> = {
    ACTIVE: "bg-green-100",
    BLOCKED: "bg-red-200",
    DELETED: "bg-gray-200",
}