import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { toListResponse } from "../helpers/toListResponse";
import { IAdvertQuery } from "../interfaces/advert.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import {
    IUserChangeStatusDTO,
    IUserCreateManagerDTO,
    IUserQuery,
    IUserUpdateAccountTypeDTO,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { userPresenter } from "../presenters/user.presenter";
import { advertService } from "../services/advert.service";
import { userService } from "../services/user.service";
import { advertPresenter } from "../presenters/advert.presenter";

class UserController {
    public async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const { validatedQuery } = req as any as {
                validatedQuery: IUserQuery;
            };
            const users = await userService.getAllUsers(validatedQuery);
            const result = toListResponse.toListResDto(
                users,
                userPresenter.toPublicResDto.bind(userPresenter.toPublicResDto),
            );
            res.status(StatusCodesEnum.OK).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async getMe(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;

            const user = await userService.getById(payload.userId);
            const result = userPresenter.toPublicResDto(user);
            res.status(StatusCodesEnum.OK).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async getMeAdverts(req: Request, res: Response, next: NextFunction) {
        try {
            const { validatedQuery } = req as any as {
                validatedQuery: IAdvertQuery;
            };
            const payload = res.locals.tokenPayload as ITokenPayload;
            const adverts = await advertService.getUserAdverts(
                payload.userId,
                validatedQuery,
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

    public async updateMe(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;
            const dto = req.body as IUserUpdateDTO;

            const user = await userService.updateById(payload.userId, dto);
            const result = userPresenter.toPublicResDto(user);
            res.status(StatusCodesEnum.OK).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async updateMeAccountType(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;
            const { accountType } = req.body as IUserUpdateAccountTypeDTO;

            const user = await userService.updateAccountType(
                payload.userId,
                accountType,
            );
            const result = userPresenter.toPublicResDto(user);
            res.status(StatusCodesEnum.OK).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async deleteMe(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;

            await userService.deleteById(payload.userId);
            res.sendStatus(StatusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }

    public async uploadAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;
            const avatar = req.files?.avatar as UploadedFile;

            if (!avatar) {
                throw new ApiError(
                    "Avatar file is required",
                    StatusCodesEnum.BAD_REQUEST,
                );
            }

            const user = await userService.uploadAvatar(payload.userId, avatar);
            const result = userPresenter.toPublicResDto(user);
            res.status(StatusCodesEnum.CREATED).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async deleteAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;
            await userService.deleteAvatar(payload.userId);
            res.sendStatus(StatusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }

    public async createManager(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const body = req.body as IUserCreateManagerDTO;
            const data = await userService.createManager(body);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const user = await userService.getById(id);
            const result = userPresenter.toPublicResDto(user);
            res.status(StatusCodesEnum.OK).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async changeStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const { status } = req.body as IUserChangeStatusDTO;

            const user = await userService.changeStatus(id, status);
            const result = userPresenter.toPublicResDto(user);
            res.status(StatusCodesEnum.OK).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            await userService.deleteById(id);
            res.sendStatus(StatusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
