import { UserRoleEnum } from "../enums/user-role.enum";
import { UserStatusEnum } from "../enums/user-status.enum";
import { IAggregatedResponse } from "../interfaces/aggregated-response.interface";
import {
    IUser,
    IUserCreate,
    IUserQuery,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public async getAllUsers(
        query: IUserQuery,
    ): Promise<IAggregatedResponse<IUser>> {
        const skip =
            query.pageSize && query.page
                ? query.pageSize * (query.page - 1)
                : 0;

        const limit = Number(query.pageSize) || 10;

        const filterObject: Record<string, any> = {};

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

        const [result] = await User.aggregate([
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

        return {
            data: result?.data ?? [],
            totalItems: result.totalItems[0]?.count ?? 0,
        };
    }

    public async create(user: IUserCreate): Promise<IUser> {
        return await User.create(user);
    }

    public async getById(userId: string): Promise<IUser | null> {
        return await User.findById(userId);
    }

    public async getByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }

    public async getByRole(role: UserRoleEnum): Promise<IUser[]> {
        return await User.find({ role });
    }

    public async updateById(
        userId: string,
        user: IUserUpdateDTO,
    ): Promise<IUser | null> {
        return await User.findByIdAndUpdate(userId, user, {
            returnDocument: "after",
        });
    }

    public async getDeletedBeforeDate(date: Date): Promise<IUser[]> {
        return await User.find({
            status: UserStatusEnum.DELETED,
            deletedAt: { $lt: date },
        });
    }

    public async deleteUsersById(ids: string[]): Promise<number> {
        const { deletedCount } = await User.deleteMany({
            _id: { $in: ids },
        });
        return deletedCount;
    }

    public async deleteField(userId: string, fieldName: string): Promise<void> {
        await User.findByIdAndUpdate(userId, {
            $unset: { [fieldName]: "" },
        });
    }
}

export const userRepository = new UserRepository();
