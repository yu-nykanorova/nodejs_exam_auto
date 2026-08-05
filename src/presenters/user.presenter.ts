import { config } from "../configs/config";
import { IUser } from "../interfaces/user.interface";

class UserPresenter {
    public toPublicResDto(user: IUser) {
        return {
            _id: user._id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            age: user.age,
            phone: user.phone,
            avatar: user.avatar
                ? `${config.AWS_S3_ENDPOINT}/${user.avatar}`
                : undefined,
            role: user.role,
            accountType: user.accountType,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    public toListResDto(users: IUser[], totalItems: number) {
        return {
            data: users.map((user) => this.toPublicResDto(user)),
            totalItems,
        };
    }
}

export const userPresenter = new UserPresenter();
