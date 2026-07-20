import {
    IUser,
    IUserCreateDTO,
    IUserQuery,
    IUserUpdateDTO,
} from "../interfaces/user.interface";

class UserRepository {
    public async getAllUsers(query: IUserQuery): Promise<IUser[]> {}

    public async create(dto: IUserCreateDTO): Promise<IUser> {}

    public async getById(id: string): Promise<IUser> {}

    public async getByEmail(email: string): Promise<IUser | null> {}

    public async updateById(
        id: string,
        user: IUserUpdateDTO,
    ): Promise<IUser | null> {}

    public async deleteById(id: string): Promise<void> {}
}

export const userRepository = new UserRepository();
