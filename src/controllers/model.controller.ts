import { NextFunction, Request, Response } from "express";

import { ModelRequestStatusEnum } from "../enums/model-request-status.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IModelCreateDTO } from "../interfaces/model.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { modelService } from "../services/model.service";

class ModelController {
    public async getAllModels(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await modelService.getAllModels();
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async createModel(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body as IModelCreateDTO;
            const data = await modelService.createModel(name);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getModelRequests(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const data = await modelService.getModelRequests();
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async createModelRequest(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;
            const dto = req.body as IModelCreateDTO;
            const data = await modelService.createModelRequest(
                dto,
                payload.userId,
            );
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getModelRequestById(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const id = req.params.id as string;
            const data = await modelService.getModelRequestById(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async updateModelRequestStatus(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const id = req.params.id as string;
            const status = req.body.status as ModelRequestStatusEnum;

            const data = await modelService.updateModelRequestStatus(
                id,
                status,
            );
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const modelController = new ModelController();
