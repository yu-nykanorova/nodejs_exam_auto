import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserRoleEnum } from "../enums/user-role.enum";
import { IAuth } from "../interfaces/auth.interface";
import { IToken, ITokenPayload } from "../interfaces/token.interface";
import {
    IChangePassword,
    IResetPassword,
    IResetPasswordSendEmail,
    ISetPassword,
    IUserCreateDTO,
} from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthController {
    public async signUpSeller(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as IUserCreateDTO;
            const data = await authService.signUp(body, UserRoleEnum.SELLER);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async signUpBuyer(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as IUserCreateDTO;
            const data = await authService.signUp(body, UserRoleEnum.BUYER);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as IAuth;
            const data = await authService.login(dto);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = res.locals.refreshToken as string;
            const jwtPayload = res.locals.jwtPayload as ITokenPayload;

            const tokens = await authService.refresh(refreshToken, jwtPayload);
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
            const dto = req.body as IResetPasswordSendEmail;
            await authService.forgotPasswordSendEmail(dto);
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
            const payload = res.locals.tokenPayload as ITokenPayload;
            const dto = req.body as IResetPassword;
            const updatedUser = await authService.forgotPasswordChange(
                dto,
                payload,
            );
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
            const payload = res.locals.tokenPayload as ITokenPayload;
            const dto = req.body as IChangePassword;
            const updatedUser = await authService.changePassword(dto, payload);
            res.status(StatusCodesEnum.OK).json(updatedUser);
        } catch (e) {
            next(e);
        }
    }

    public async setPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;
            const password = req.body as ISetPassword;
            const updatedUser = await authService.setPassword(
                password,
                payload,
            );
            res.status(StatusCodesEnum.OK).json(updatedUser);
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = res.locals.tokenPair as IToken;
            await authService.logout(refreshToken);
            res.sendStatus(StatusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
