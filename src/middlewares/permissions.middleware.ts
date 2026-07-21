import { NextFunction, Request, Response } from "express";

import { PermissionsEnum } from "../enums/permissions.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { rolePermissions } from "../permissions/role-permissions";

class PermissionsMiddleware {
    public checkPermission(permission: PermissionsEnum) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const { role } = res.locals.tokenPayload;

                const permissions = rolePermissions[role];

                if (!permissions.includes(permission)) {
                    throw new ApiError(
                        "Access denied",
                        StatusCodesEnum.FORBIDDEN,
                    );
                }

                next();
            } catch (e) {
                next(e);
            }
        };
    }
}

export const permissionsMiddleware = new PermissionsMiddleware();
