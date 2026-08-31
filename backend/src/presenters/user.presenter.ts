import { config } from "../configs/config";
import { IUser, IUserPublic } from "../interfaces/user.interface";

class UserPresenter {
    public toPublicResDto(user: IUser): IUserPublic {
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
            createdAt: user.createdAt.toString(),
            updatedAt: user.updatedAt.toString(),
        };
    }
}

export const userPresenter = new UserPresenter();
