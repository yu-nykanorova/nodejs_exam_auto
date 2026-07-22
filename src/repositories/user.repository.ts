import { UserRoleEnum } from "../enums/user-role.enum";
import { UserStatusEnum } from "../enums/user-status.enum";
import {
    IUser,
    IUserCreateDTO,
    IUserQuery,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public async getAllUsers(query: IUserQuery): Promise<any> {
        const skip =
            query.pageSize && query.page
                ? query.pageSize * (query.page - 1)
                : 0;

        const limit = Number(query.pageSize) || 10;

        const filterObject: Record<string, any> = {
            status: {
                $ne: UserStatusEnum.DELETED,
            },
        };

        if (query.search) {
            filterObject.$or = [
                { name: { $regex: query.search, $options: "i" } },
                { surname: { $regex: query.search, $options: "i" } },
            ];
        }
        const orderObject: Record<string, any> = {};

        if (query.order) {
            if (query.order.startsWith("-")) {
                orderObject[query.order.slice(1)] = -1;
            } else {
                orderObject[query.order] = 1;
            }
        } else {
            orderObject.createdAt = -1;
        }

        return await User.aggregate([
            {
                $match: filterObject,
            },
            {
                $sort: orderObject,
            },
            {
                $facet: {
                    data: [{ $skip: skip }, { $limit: limit }],
                    totalItems: [{ $count: "count" }],
                },
            },
        ]);
    }

    public async create(
        user: IUserCreateDTO,
        role: UserRoleEnum,
    ): Promise<IUser> {
        return await User.create({ ...user, role });
    }

    public async getById(userId: string): Promise<IUser> {
        return await User.findById(userId);
    }

    public async getByEmail(email: string): Promise<IUser> {
        return await User.findOne({ email });
    }

    public async updateById(
        userId: string,
        user: IUserUpdateDTO,
    ): Promise<IUser> {
        return await User.findByIdAndUpdate(userId, user, { new: true });
    }

    public async deleteById(userId: string): Promise<void> {
        await User.findByIdAndDelete(userId);
    }
}

export const userRepository = new UserRepository();
