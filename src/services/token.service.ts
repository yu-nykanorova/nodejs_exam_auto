import jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.errors";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { tokenRepository } from "../repositories/token.repository";

class TokenService {
    public generateTokens(payload: ITokenPayload): ITokenPair {
        const accessToken = this.signToken(
            payload,
            config.JWT_ACCESS_SECRET,
            config.JWT_ACCESS_LIFETIME,
        );
        const refreshToken = this.signToken(
            payload,
            config.JWT_REFRESH_SECRET,
            config.JWT_REFRESH_LIFETIME,
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    public verifyToken(token: string, type: TokenTypeEnum): ITokenPayload {
        try {
            let secret: string;

            switch (type) {
                case TokenTypeEnum.ACCESS:
                    secret = config.JWT_ACCESS_SECRET;
                    break;
                case TokenTypeEnum.REFRESH:
                    secret = config.JWT_REFRESH_SECRET;
                    break;
                default:
                    throw new ApiError(
                        "Invalid token type",
                        StatusCodesEnum.BAD_REQUEST,
                    );
            }
            return jwt.verify(token, secret) as ITokenPayload;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            throw new ApiError("Invalid token", StatusCodesEnum.UNAUTHORIZED);
        }
    }

    public generateActionToken(
        payload: ITokenPayload,
        type: ActionTokenTypeEnum,
    ): string {
        let secret: string;
        let tokenLifetime: jwt.SignOptions["expiresIn"];

        switch (type) {
            case ActionTokenTypeEnum.CREATE_PASSWORD:
                secret = config.ACTION_CREATE_PASSWORD_SECRET;
                tokenLifetime = config.ACTION_CREATE_PASSWORD_LIFETIME;
                break;
            case ActionTokenTypeEnum.FORGOT_PASSWORD:
                secret = config.ACTION_FORGOT_PASSWORD_SECRET;
                tokenLifetime = config.ACTION_FORGOT_PASSWORD_LIFETIME;
                break;
            default:
                throw new ApiError(
                    "Invalid token type",
                    StatusCodesEnum.BAD_REQUEST,
                );
        }

        return this.signToken(payload, secret, tokenLifetime);
    }

    public verifyActionToken(
        token: string,
        type: ActionTokenTypeEnum,
    ): ITokenPayload {
        try {
            let secret: string;

            switch (type) {
                case ActionTokenTypeEnum.CREATE_PASSWORD:
                    secret = config.ACTION_CREATE_PASSWORD_SECRET;
                    break;
                case ActionTokenTypeEnum.FORGOT_PASSWORD:
                    secret = config.ACTION_FORGOT_PASSWORD_SECRET;
                    break;
                default:
                    throw new ApiError(
                        "Invalid token type",
                        StatusCodesEnum.BAD_REQUEST,
                    );
            }
            return jwt.verify(token, secret) as ITokenPayload;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            throw new ApiError("Invalid token", StatusCodesEnum.UNAUTHORIZED);
        }
    }

    public async isTokenExists(
        token: string,
        type: TokenTypeEnum,
    ): Promise<boolean> {
        const iTokenPromise = await tokenRepository.findByParams({
            [type]: token,
        });
        return !!iTokenPromise;
    }

    private signToken(
        payload: ITokenPayload,
        secret: string,
        expiresIn: jwt.SignOptions["expiresIn"],
    ): string {
        return jwt.sign(payload, secret, { expiresIn });
    }
}

export const tokenService = new TokenService();
