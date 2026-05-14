import { prisma } from "../../configs/prisma";
import { hashPassword } from "../../utils/hash";
import type { CreateUserDTO, UpdateUserDTO } from "./user.types";

const create = async (data: CreateUserDTO) => {
    const { ...userData } = data;

    const hashedPassword = await hashPassword(userData.password);

    return prisma.$transaction(async (tx) => {

        const user = await tx.user.create({
            data: { ...userData, password: hashedPassword },
        });
        return user
    });
};


const update = async (userId: string, data: UpdateUserDTO) => {
    const { ...userData } = data;

    let hashedPassword: string;
    if (userData.password) {
        hashedPassword = await hashPassword(userData.password);
    }

    return prisma.$transaction(async (tx) => {
        const user = await tx.user.update({
            where: { id: userId },
            data: { ...userData, password: hashedPassword },
        });

        return tx.user.findUnique({
            where: { id: userId },
        });
    });
};


const findById = (id: string) => {
    return prisma.user.findUnique({
        where: { id },
    });
};

const findByEmail = (email: string) => {
    return prisma.user.findUnique({
        where: { email },
    });
};

const findAll = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const data = await prisma.user.findMany({
        skip,
        take: limit,
    });

    const total = await prisma.user.count();

    return {
        data,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};


export const userRepository = {
    create,
    update,
    findByEmail,
    findById,
    findAll

}


