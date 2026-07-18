import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";

class AuthService {
    public async signUp() {}

    public async login() {}

    public async refresh() {}

    public async forgotPasswordSendEmail() {}

    public async forgotPasswordChange() {}

    public async changePassword() {}

    public async setPassword() {}

    public async logout() {}

    private async checkPasswordsEquality(
        newPassword: string,
        userId: string,
    ): Promise<void> {
        const user = await userRepository.getById(userId);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        const isCurrentPassword = await this.comparePassword(
            newPassword,
            user.password,
        );

        if (isCurrentPassword) {
            throw new ApiError("New password must differ from the previous one", StatusCodesEnum.BED_REQUEST);
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
                        StatusCodesEnum.BED_REQUEST,
                    );
                }
            }
        }
    }
}
}

export const authService = new AuthService();
