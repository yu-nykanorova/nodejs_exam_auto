import { AccountTypeEnum } from "../enums/account-type.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserStatusEnum } from "../enums/user-status.enum";
import { ApiError } from "../errors/api.errors";
import {
    IUser,
    IUserQuery,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public async getAllUsers(query: IUserQuery): Promise<IUser[]> {}

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

    public async createManager() {}

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
                StatusCodesEnum.BED_REQUEST,
            );
        }
    }
}

export const userService = new UserService();
