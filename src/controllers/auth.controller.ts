import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";

class AuthController {
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: Request, res: Response, next: NextFunction) {

        try {
            res.status(StatusCodesEnum.OK).json(tokens);
        } catch (e) {
            next(e);
        }
    }

    public async forgotPasswordSendEmail(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            res.sendStatus(StatusCodesEnum.OK);
        } catch (e) {
            next(e);
        }
    }

    public async forgotPasswordChange(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            res.status(StatusCodesEnum.OK).json(updatedUser);
        } catch (e) {
            next(e);
        }
    }

    public async changePassword(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            res.status(StatusCodesEnum.OK).json(updatedUser);
        } catch (e) {
            next(e);
        }
    }

    public async setPassword(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(StatusCodesEnum.OK).json(updatedUser);
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.sendStatus(StatusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
