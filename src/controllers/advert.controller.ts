import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import {
    IAdvertChangeStatusDTO,
    IAdvertCreateDTO,
    IAdvertQuery,
    IAdvertUpdateDTO,
} from "../interfaces/advert.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { advertService } from "../services/advert.service";
import { advertStatisticsService } from "../services/advert-statistics.service";

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
            const payload = res.locals.tokenPayload as ITokenPayload;
            const body = req.body as IAdvertCreateDTO;
            const data = await advertService.createAdvert(body, payload.userId);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const advertId = req.params.id as string;
            const payload = res.locals.tokenPayload as ITokenPayload;
            const data = await advertService.getById(advertId, payload.userId);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async updateAdvert(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;
            const dto = req.body as IAdvertUpdateDTO;
            const id = req.params.id as string;
            const data = await advertService.updateAdvert(
                id,
                payload.userId,
                dto,
            );
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async changeStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const { status } = req.body as IAdvertChangeStatusDTO;

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
            const id = req.params.id as string;
            const payload = res.locals.tokenPayload as ITokenPayload;
            const data = await advertStatisticsService.getStatistics(
                id,
                payload.userId,
            );
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async deleteAdvert(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;
            const id = req.params.id as string;
            await advertService.deleteAdvert(id, payload.userId);

            res.status(StatusCodesEnum.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }
}

export const advertController = new AdvertController();
