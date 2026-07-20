import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { userRepository } from "../repositories/user.repository";
import { IUser, IUserQuery } from "../interfaces/user.interface";

class UserService {
    public async getAllUsers(query: IUserQuery): Promise<IUser[]> {}

    public async getMe() {}

    public async getMeAdverts() {}

    public async updateMe() {}

    public async updateMeAccountType() {}

    public async deleteMe() {}

    public async createManager() {}

    public async getById() {}

    public async changeStatus() {}

    public async deleteById() {}

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
