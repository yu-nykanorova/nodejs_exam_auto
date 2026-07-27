import { NextFunction, Request, Response } from "express";

import { BrandRequestStatusEnum } from "../enums/brand-request-status.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IBrandCreateDTO } from "../interfaces/brand.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { brandService } from "../services/brand.service";

class BrandController {
    public async getAllBrands(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await brandService.getAllBrands();
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async createBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body as IBrandCreateDTO;
            const data = await brandService.createBrand(name);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getBrandRequests(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const data = await brandService.getBrandRequests();
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async createBrandRequest(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;
            const dto = req.body as IBrandCreateDTO;
            const data = await brandService.createBrandRequest(
                dto,
                payload.userId,
            );
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getBrandRequestById(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const id = req.params.id as string;
            const data = await brandService.getBrandRequestById(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async updateBrandRequestStatus(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const id = req.params.id as string;
            const status = req.body.status as BrandRequestStatusEnum;

            const data = await brandService.updateBrandRequestStatus(
                id,
                status,
            );
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const brandController = new BrandController();
