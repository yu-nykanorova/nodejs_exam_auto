import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.errors";
import { tokenService } from "../services/token.service";

class CommonMiddleware {
    public isIdValid(key: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params[key];

                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError(
                        `Invalid id [${key}]`,
                        StatusCodesEnum.BAD_REQUEST,
                    );
                }

                next();
            } catch (e) {
                next(e);
            }
        };
    }

    public isBodyValid(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            } catch (e: any) {
                next(
                    new ApiError(
                        e.details[0].message,
                        StatusCodesEnum.BAD_REQUEST,
                    ),
                );
            }
        };
    }

    public isQueryValid(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const query = await validator.validateAsync(req.query);
                (req as any).validatedQuery = query;
                next();
            } catch (e: any) {
                next(
                    new ApiError(
                        e.details[0].message,
                        StatusCodesEnum.BAD_REQUEST,
                    ),
                );
            }
        };
    }

    public async identifyUser(req: Request, res: Response, next: NextFunction) {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];

        if (!token) {
            return next();
        }

        try {
            const payload = tokenService.verifyToken(
                token,
                TokenTypeEnum.ACCESS,
            );
            res.locals.tokenPayload = payload;
        } catch {
            // ignore error, continue as guest
        }

        return next();
    }
}

export const commonMiddleware = new CommonMiddleware();
