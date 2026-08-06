import { UploadedFile } from "express-fileupload";

import { config } from "../configs/config";
import { emailConstants } from "../constants/email.constants";
import { AccountTypeEnum } from "../enums/account-type.enum";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { AdvertStatusEnum } from "../enums/advert-status.enum";
import { EmailEnum } from "../enums/email.enum";
import { FileItemsTypeEnum } from "../enums/file-items-type.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserRoleEnum } from "../enums/user-role.enum";
import { UserStatusEnum } from "../enums/user-status.enum";
import { ApiError } from "../errors/api.errors";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import {
    IUser,
    IUserCreateManagerDTO,
    IUserQuery,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { advertRepository } from "../repositories/advert.repository";
import { oldHashesRepository } from "../repositories/old-hashes.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { awsImagesStorageService } from "./awsImagesStorage.service";
import { emailService } from "./email.service";
import { tokenService } from "./token.service";

class UserService {
    public async getAllUsers(
        query: IUserQuery,
    ): Promise<IPaginatedResponse<IUser>> {
        const dataFromDB = await userRepository.getAllUsers(query);

        const data: IUser[] = dataFromDB.data;
        const totalItems = dataFromDB.totalItems;
        const pageSize = Number(query.pageSize) || 10;
        const page = Number(query.page) || 1;
        const totalPages = Math.ceil(totalItems / pageSize);

        return {
            totalItems,
            totalPages,
            prevPage: page > 1,
            nextPage: page < totalPages,
            data,
        };
    }

    public async getById(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId);

        if (!user || user.status === UserStatusEnum.DELETED) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        return user;
    }

    public async updateById(
        userId: string,
        dto: IUserUpdateDTO,
    ): Promise<IUser | null> {
        const user = await userRepository.getById(userId);

        if (!user || user.status === UserStatusEnum.DELETED) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        return await userRepository.updateById(userId, dto);
    }

    public async updateAccountType(
        userId: string,
        accountType: AccountTypeEnum,
    ) {
        const user = await userRepository.getById(userId);

        if (!user || user.status === UserStatusEnum.DELETED) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        if (user.accountType === accountType) {
            throw new ApiError(
                "You already has this account type",
                StatusCodesEnum.BAD_REQUEST,
            );
        }

        return await userRepository.updateById(userId, { accountType });
    }

    public async uploadAvatar(
        userId: string,
        file: UploadedFile,
    ): Promise<IUser> {
        const user = await userRepository.getById(userId);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        const avatar = await awsImagesStorageService.uploadFile(
            file,
            FileItemsTypeEnum.USERS,
            user._id,
        );

        const updatedUser = await userRepository.updateById(user._id, {
            avatar,
        });
        if (user.avatar) {
            await awsImagesStorageService.deleteFile(user.avatar);
        }

        if (!updatedUser) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        return updatedUser;
    }

    public async deleteAvatar(userId: string): Promise<void> {
        const user = await userRepository.getById(userId);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        if (!user.avatar) {
            throw new ApiError("Avatar not found", StatusCodesEnum.NOT_FOUND);
        }

        await awsImagesStorageService.deleteFile(user.avatar);

        await userRepository.updateById(user._id, { avatar: null });
    }

    public async createManager(
        manager: IUserCreateManagerDTO,
    ): Promise<{ newManager: IUser; actionToken: string }> {
        await userService.isEmailUnique(manager.email);
        const newManager = await userRepository.create({
            ...manager,
            role: UserRoleEnum.MANAGER,
            status: UserStatusEnum.ACTIVE,
        });

        const actionToken = tokenService.generateActionToken(
            {
                userId: newManager._id,
                role: newManager.role,
            },
            ActionTokenTypeEnum.CREATE_PASSWORD,
        );

        await actionTokenRepository.create({
            token: actionToken,
            type: ActionTokenTypeEnum.CREATE_PASSWORD,
            _userId: newManager._id,
        });

        await emailService.sendEmail(
            newManager.email,
            emailConstants[EmailEnum.WELCOME_MANAGER],
            {
                name: newManager.name,
                email: newManager.email,
                actionToken,
                frontUrl: config.FRONT_URL,
            },
        );

        return { newManager, actionToken };
    }

    public async changeStatus(
        userId: string,
        status: UserStatusEnum,
    ): Promise<IUser | null> {
        const user = await userRepository.getById(userId);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        return await userRepository.updateById(userId, { status });
    }

    public async deleteById(userId: string): Promise<IUser | null> {
        const user = await userRepository.getById(userId);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        if (user.status === UserStatusEnum.DELETED) {
            throw new ApiError(
                "User was already deleted",
                StatusCodesEnum.BAD_REQUEST,
            );
        }

        await tokenRepository.deleteAllByParams({ _userId: userId });

        await actionTokenRepository.deleteActionToken({ _userId: userId });

        await oldHashesRepository.deleteManyByParams({ _userId: userId });

        await advertRepository.updateStatusByUserId(
            userId,
            AdvertStatusEnum.DELETED,
        );

        return await userRepository.updateById(userId, {
            status: UserStatusEnum.DELETED,
            deletedAt: new Date(),
        });
    }

    public async cleanUsersArchiveByDate(date: Date): Promise<number> {
        const users = await userRepository.getDeletedBeforeDate(date);

        for (const user of users) {
            await advertRepository.deleteAdvertsByUserId(user._id);
        }

        const userIds = users.map((user) => user._id);

        return await userRepository.deleteUsersById(userIds);
    }

    public async isEmailUnique(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);

        if (user) {
            throw new ApiError(
                "User is already exists",
                StatusCodesEnum.BAD_REQUEST,
            );
        }
    }
}

export const userService = new UserService();
