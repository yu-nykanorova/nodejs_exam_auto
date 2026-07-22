import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";

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
}

export const commonMiddleware = new CommonMiddleware();
