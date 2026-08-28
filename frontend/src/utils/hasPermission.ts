import type { Permission } from "../constants/permissions.ts";
import type { Role } from "../constants/roles.ts";
import { rolePermissions } from "../constants/rolePermissions.ts";

export const hasPermission = (userRole: Role, userPermission: Permission): boolean => {
    return rolePermissions[userRole].includes(userPermission);
}