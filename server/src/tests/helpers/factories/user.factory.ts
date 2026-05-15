import bcrypt from "bcrypt";
import { prisma } from "../../../configs/prisma";

export const createTestUser = async () => {
    const password = await bcrypt.hash("123456", 10);

    return prisma.user.create({
        data: {
            name: "Admin",
            email: "admin@test.com",
            password,
            role: "ADMIN",
        },
    });
};