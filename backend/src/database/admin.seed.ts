import mongoose from "mongoose";

import { config } from "../configs/config";
import { UserRoleEnum } from "../enums/user-role.enum";
import { UserStatusEnum } from "../enums/user-status.enum";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "../services/password.service";

const seedAdmin = async (): Promise<void> => {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(config.MONGO_URI);

        const admin = await userRepository.getByEmail(config.ADMIN_EMAIL);

        if (admin) {
            console.log(
                "Admin already exists. Use admin data to login the platform as admin.",
            );
            return;
        }

        const hashedPassword = await passwordService.hashPassword(
            config.ADMIN_PASSWORD,
        );

        await userRepository.create({
            email: config.ADMIN_EMAIL,
            password: hashedPassword,
            name: "Admin",
            surname: "First",
            age: 30,
            role: UserRoleEnum.ADMIN,
            status: UserStatusEnum.ACTIVE,
        });

        console.log("Admin successfully created.");
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
    }
};

seedAdmin();
