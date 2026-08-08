import { config } from "../configs/config";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
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
    public toListResDto(usersResponse: IPaginatedResponse<IUser>) {
        const users = usersResponse.data;

        return {
            totalItems: usersResponse.totalItems,
            totalPages: usersResponse.totalPages,
            prevPage: usersResponse.prevPage,
            nextPage: usersResponse.nextPage,
            data: users.map((user) => this.toPublicResDto(user)),
        };
    }
}

export const userPresenter = new UserPresenter();
