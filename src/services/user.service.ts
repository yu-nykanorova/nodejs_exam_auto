import { config } from "../configs/config";
import { emailConstants } from "../constants/email.constants";
import { AccountTypeEnum } from "../enums/account-type.enum";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { EmailEnum } from "../enums/email.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserRoleEnum } from "../enums/user-role.enum";
import { UserStatusEnum } from "../enums/user-status.enum";
import { ApiError } from "../errors/api.errors";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import {
    IUser,
    IUserCreateDTO,
    IUserQuery,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { tokenService } from "./token.service";

class UserService {
    public async getAllUsers(
        query: IUserQuery,
    ): Promise<IPaginatedResponse<IUser>> {
        const dataFromDB = await userRepository.getAllUsers(query);

        const result = dataFromDB[0];

        const data: IUser[] = result?.data ?? [];
        const totalItems = result?.totalItems?.[0]?.count ?? 0;
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

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        return user;
    }

    public async updateById(
        userId: string,
        userDataToUpdate: IUserUpdateDTO,
    ): Promise<IUser | null> {
        const user = await userRepository.getById(userId);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        return await userRepository.updateById(userId, userDataToUpdate);
    }

    public async deleteById(userId: string): Promise<void> {
        const user = await userRepository.getById(userId);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        await userRepository.deleteById(userId);
    }

    public async getMeAdverts() {}

    public async updateAccountType(
        userId: string,
        accountType: AccountTypeEnum,
    ) {
        const user = await userRepository.getById(userId);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        return await userRepository.updateById(userId, { accountType });
    }

    public async createManager(manager: IUserCreateDTO): Promise<IUser> {
        await userService.isEmailUnique(manager.email);
        const newManager = await userRepository.create(
            manager,
            UserRoleEnum.MANAGER,
        );

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

        return newManager;
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
