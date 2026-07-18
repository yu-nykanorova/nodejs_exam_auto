import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";

class BrandController {
    public async getAllBrands(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async createBrand(req: Request, res: Response, next: NextFunction) {
        try {
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
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async updateBrandRequest(
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
}

export const brandController = new BrandController();
