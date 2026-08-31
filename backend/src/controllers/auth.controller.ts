import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserRoleEnum } from "../enums/user-role.enum";
import { IAuth } from "../interfaces/auth.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import {
    IChangePassword,
    IResetPassword,
    IResetPasswordSendEmail,
    ISetPassword,
    IUserCreateBuyerDTO,
    IUserCreateSellerDTO,
} from "../interfaces/user.interface";
import { userPresenter } from "../presenters/user.presenter";
import { authService } from "../services/auth.service";

class AuthController {
    public signUpSeller = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        await this.signUp(req, res, next, UserRoleEnum.SELLER);
    };

    public signUpBuyer = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        await this.signUp(req, res, next, UserRoleEnum.BUYER);
    };

    public async signUp(
        req: Request,
        res: Response,
        next: NextFunction,
        role: UserRoleEnum,
    ) {
        try {
            const body = req.body as IUserCreateBuyerDTO | IUserCreateSellerDTO;
            const data = await authService.signUp(body, role);
            const result = userPresenter.toPublicResDto(data.user);
            res.status(StatusCodesEnum.CREATED).json({
                user: result,
                tokens: data.tokens,
            });
        } catch (e) {
            next(e);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as IAuth;
            const data = await authService.login(dto);
            const result = userPresenter.toPublicResDto(data.user);
            res.status(StatusCodesEnum.OK).json({
                user: result,
                tokens: data.tokens,
            });
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = res.locals.refreshToken as string;
            const payload = res.locals.tokenPayload as ITokenPayload;

            const tokens = await authService.refresh(refreshToken, payload);
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
            const actionToken = await authService.forgotPasswordSendEmail(dto);
            res.status(StatusCodesEnum.OK).json(actionToken);
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
            const result = userPresenter.toPublicResDto(updatedUser);
            res.status(StatusCodesEnum.OK).json(result);
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
            await authService.changePassword(dto, payload);
            res.sendStatus(StatusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }

    public async setPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;
            const password = req.body as ISetPassword;
            await authService.setPassword(password, payload);
            res.sendStatus(StatusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = res.locals.refreshToken as string;
            await authService.logout(refreshToken);
            res.sendStatus(StatusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
