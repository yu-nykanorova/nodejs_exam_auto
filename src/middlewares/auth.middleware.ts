import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/api.errors";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { tokenService } from "../services/token.service";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { IRefresh } from "../interfaces/token.interface";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { actionTokenRepository } from "../repositories/action-token.repository";

class AuthMiddleware {
    public async checkAccessToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const authorizationHeader = req.headers.authorization;

            if (!authorizationHeader) {
                throw new ApiError(
                    "No token provided",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }

            const accessToken = authorizationHeader.split(" ")[1];

            if (!accessToken) {
                throw new ApiError(
                    "No token provided",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }

            const tokenPayload = tokenService.verifyToken(
                accessToken,
                TokenTypeEnum.ACCESS,
            );
            const isTokenExists = await tokenService.isTokenExists(
                accessToken,
                TokenTypeEnum.ACCESS,
            );

            if (!isTokenExists) {
                throw new ApiError(
                    "Invalid token",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }

            res.locals.tokenPayload = tokenPayload;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { refreshToken } = req.body as IRefresh;

            if (!refreshToken) {
                throw new ApiError(
                    "No refresh token provided",
                    StatusCodesEnum.FORBIDDEN,
                );
            }
            const tokenPayload = tokenService.verifyToken(
                refreshToken,
                TokenTypeEnum.REFRESH,
            );
            const isTokenExists = await tokenService.isTokenExists(
                refreshToken,
                TokenTypeEnum.REFRESH,
            );

            if (!isTokenExists) {
                throw new ApiError("Invalid token", StatusCodesEnum.FORBIDDEN);
            }

            res.locals.tokenPayload = tokenPayload;

            next();
        } catch (e) {
            next(e);
        }
    }

    public checkActionToken(type: ActionTokenTypeEnum) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const token: string = req.body.token;
                const payload = tokenService.verifyActionToken(token, type);
                const tokenEntity =
                    await actionTokenRepository.getByToken(token);
                if (!tokenEntity) {
                    throw new ApiError(
                        "Invalid token",
                        StatusCodesEnum.UNAUTHORIZED,
                    );
                }
                res.locals.tokenPayload = payload;
                res.locals.actionToken = token;
                next();
            } catch (e) {
                next(e);
            }
        };
    }
}

export const authMiddleware = new AuthMiddleware();