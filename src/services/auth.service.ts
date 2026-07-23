import { config } from "../configs/config";
import { emailConstants } from "../constants/email.constants";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { EmailEnum } from "../enums/email.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserRoleEnum } from "../enums/user-role.enum";
import { UserStatusEnum } from "../enums/user-status.enum";
import { ApiError } from "../errors/api.errors";
import { IAuth } from "../interfaces/auth.interface";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { IChangePassword, IResetPassword, IResetPasswordSendEmail, ISetPassword, IUser, IUserCreateDTO } from "../interfaces/user.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { oldHashesRepository } from "../repositories/old-hashes.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
    public async signUp(
        user: IUserCreateDTO,
        role: UserRoleEnum,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        await userService.isEmailUnique(user.email);
        const password = await passwordService.hashPassword(user.password);
        const newUser = await userRepository.create(
            { ...user, password },
            role,
            UserStatusEnum.ACTIVE,
        );
        const tokens = tokenService.generateTokens({
            userId: newUser._id,
            role: newUser.role,
        });
        await tokenRepository.create({ ...tokens, _userId: newUser._id });

        await emailService.sendEmail(
            newUser.email,
            emailConstants[EmailEnum.WELCOME],
            { name: newUser.name },
        );
        return { user: newUser, tokens };
    }

    public async login(
        dto: IAuth,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        const user = await userRepository.getByEmail(dto.email);

        if (!user || user.status === UserStatusEnum.DELETED) {
            throw new ApiError(
                "Email or password invalid",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }

        const isValidPassword = await passwordService.comparePassword(
            dto.password,
            user.password,
        );

        if (!isValidPassword) {
            throw new ApiError(
                "Email or password invalid",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }

        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });

        await tokenRepository.create({ ...tokens, _userId: user._id });

        return { user, tokens };
    }

    public async refresh(
        refreshToken: string,
        payload: ITokenPayload,
    ): Promise<ITokenPair> {
        await tokenRepository.deleteTokenPair(refreshToken);

        const tokens = tokenService.generateTokens({
            userId: payload.userId,
            role: payload.role,
        });

        await tokenRepository.create({ ...tokens, _userId: payload.userId });

        return tokens;
    }

    public async forgotPasswordSendEmail(
        dto: IResetPasswordSendEmail,
    ): Promise<void> {
        const user = await userRepository.getByEmail(dto.email);

        if (!user || user.status === UserStatusEnum.DELETED) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        const actionToken = tokenService.generateActionToken(
            { userId: user._id, role: user.role },
            ActionTokenTypeEnum.FORGOT_PASSWORD,
        );

        await actionTokenRepository.create({
            token: actionToken,
            type: ActionTokenTypeEnum.FORGOT_PASSWORD,
            _userId: user._id,
        });

        await emailService.sendEmail(
            user.email,
            emailConstants[EmailEnum.FORGOT_PASSWORD],
            { actionToken, frontUrl: config.FRONT_URL },
        );
    }

    public async forgotPasswordChange(
        dto: IResetPassword,
        payload: ITokenPayload,
    ): Promise<IUser> {
        const user = await userRepository.getById(payload.userId);

        if (!user || user.status === UserStatusEnum.DELETED) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        const newPassword = await passwordService.hashPassword(dto.password);

        await this.checkPasswordsEquality(dto.password, payload.userId);

        const updatedUser = await userRepository.updateById(payload.userId, {
            password: newPassword,
        });

        await actionTokenRepository.deleteActionToken({
            token: dto.token,
        });

        return updatedUser;
    }

    public async changePassword(
        dto: IChangePassword,
        payload: ITokenPayload,
    ): Promise<void> {
        const user = await userRepository.getById(payload.userId);

        if (!user || user.status === UserStatusEnum.DELETED) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        const isPasswordCorrect = await passwordService.comparePassword(
            dto.oldPassword,
            user.password,
        );

        if (!isPasswordCorrect) {
            throw new ApiError(
                "Wrong previous password",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }

        const newPassword = await passwordService.hashPassword(dto.password);

        await this.checkPasswordsEquality(dto.password, payload.userId);

        await userRepository.updateById(payload.userId, {
            password: newPassword,
        });

        await oldHashesRepository.create({
            _userId: payload.userId,
            hash: user.password,
        });

        await tokenRepository.deleteAllByParams({ _userId: payload.userId });
    }

    public async setPassword(
        dto: ISetPassword,
        payload: ITokenPayload,
    ): Promise<void> {
        const user = await userRepository.getById(payload.userId);

        if (!user || user.status === UserStatusEnum.DELETED) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        const password = await passwordService.hashPassword(dto.password);

        await userRepository.updateById(payload.userId, { password });

        await oldHashesRepository.create({
            _userId: payload.userId,
            hash: user.password,
        });

        await actionTokenRepository.deleteActionToken({
            _userId: payload.userId,
        });
    }

    public async logout(refreshToken: string): Promise<void> {
        await tokenRepository.deleteTokenPair(refreshToken);
    }

    private async checkPasswordsEquality(
        newPassword: string,
        userId: string,
    ): Promise<void> {
        const user = await userRepository.getById(userId);

        if (!user || user.status === UserStatusEnum.DELETED) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        const isCurrentPassword = await passwordService.comparePassword(
            newPassword,
            user.password,
        );

        if (isCurrentPassword) {
            throw new ApiError(
                "New password must differ from the previous one",
                StatusCodesEnum.BAD_REQUEST,
            );
        }

        const oldHashes = await oldHashesRepository.findByParams({
            _userId: userId,
        });

        if (oldHashes) {
            for (const oldHash of oldHashes) {
                const isPasswordEqual = await passwordService.comparePassword(
                    newPassword,
                    oldHash.hash,
                );

                if (isPasswordEqual) {
                    throw new ApiError(
                        "New password must differ from the previous one",
                        StatusCodesEnum.BAD_REQUEST,
                    );
                }
            }
        }
    }
}

export const authService = new AuthService();
