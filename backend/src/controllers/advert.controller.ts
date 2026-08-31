import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { toListResponse } from "../helpers/toListResponse";
import {
    IAdvertChangeStatusDTO,
    IAdvertCreateDTO,
    IAdvertQuery,
    IAdvertUpdateDTO,
} from "../interfaces/advert.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { advertPresenter } from "../presenters/advert.presenter";
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
            const payload = res.locals.tokenPayload as
                ITokenPayload | undefined;
            const adverts = await advertService.getAllAdverts(
                validatedQuery,
                payload,
            );
            const result = toListResponse.toListResDto(
                adverts,
                advertPresenter.toPublicResDto.bind(
                    advertPresenter.toPublicResDto,
                ),
            );
            res.status(StatusCodesEnum.OK).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async createAdvert(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;
            const body = req.body as IAdvertCreateDTO;
            const advert = await advertService.createAdvert(
                body,
                payload.userId,
            );
            const result = advertPresenter.toPublicResDto(advert);
            res.status(StatusCodesEnum.CREATED).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const advertId = req.params.id as string;
            const payload = res.locals.tokenPayload as
                ITokenPayload | undefined;
            const advert = await advertService.getById(advertId, payload);
            const result = advertPresenter.toPublicResDto(advert);
            res.status(StatusCodesEnum.OK).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async updateAdvert(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;
            const dto = req.body as IAdvertUpdateDTO;
            const id = req.params.id as string;
            const advert = await advertService.updateAdvert(id, payload, dto);
            const result = advertPresenter.toPublicResDto(advert);
            res.status(StatusCodesEnum.OK).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async uploadPhoto(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;
            const photo = req.files?.avatar as UploadedFile;
            const id = req.params.id as string;

            if (!photo) {
                throw new ApiError(
                    "Advert photo is required",
                    StatusCodesEnum.BAD_REQUEST,
                );
            }

            const advert = await advertService.uploadPhoto(id, payload, photo);
            const result = advertPresenter.toPublicResDto(advert);
            res.status(StatusCodesEnum.CREATED).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async deletePhoto(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;
            const id = req.params.id as string;
            await advertService.deletePhoto(id, payload);
            res.sendStatus(StatusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }

    public async changeStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const { status } = req.body as IAdvertChangeStatusDTO;

            const advert = await advertService.changeStatus(id, status);
            const result = advertPresenter.toPublicResDto(advert);
            res.status(StatusCodesEnum.OK).json(result);
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
            await advertService.deleteAdvert(id, payload);
            res.status(StatusCodesEnum.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }
}

export const advertController = new AdvertController();
