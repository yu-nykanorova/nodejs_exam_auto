import { NextFunction, Request, Response } from "express";

import { AdvertStatusEnum } from "../enums/advert-status.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserStatusEnum } from "../enums/user-status.enum";
import {
    IAdvertCreateDTO,
    IAdvertQuery,
    IAdvertUpdateDTO,
} from "../interfaces/advert.interface";
import {
    IUserCreateDTO,
    IUserQuery,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { advertService } from "../services/advert.service";
import { userService } from "../services/user.service";
import { ITokenPayload } from "../interfaces/token.interface";

class AdvertController {
    public async getAllAdverts(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { validatedQuery } = req as any as {
                validatedQuery: IAdvertQuery;
            };
            const data = await advertService.getAllAdverts(validatedQuery);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async createAdvert(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as IAdvertCreateDTO;
            const data = await advertService.createAdvert(body);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const data = await advertService.getById(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async updateAdvert(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;
            const dto = req.body as IAdvertUpdateDTO;

            const data = await advertService.updateAdvert(payload.userId, dto);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async changeStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const { status } = req.body as IAdvertUpdateDTO;

            const data = await advertService.changeStatus(id, status);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getStatistics(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            await advertService.changeStatus(id, AdvertStatusEnum.DELETED);
            res.status(StatusCodesEnum.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }
}

export const advertController = new AdvertController();
