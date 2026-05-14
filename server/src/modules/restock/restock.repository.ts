import { prisma } from "../../configs/prisma";
import type { CreateRestockDTO, UpdateRestockDTO } from "./restock.types";

const create = async (data: CreateRestockDTO) => {
    const { items, ...restockData } = data;

    return prisma.$transaction(async (tx) => {

        const restock = await tx.restock.create({
            data: { ...restockData },
        });

        return restock;
    });
};


const update = async (restockId: string, data: UpdateRestockDTO) => {
    const { items, ...restockData } = data;

    return prisma.$transaction(async (tx) => {
        const restock = await tx.restock.update({
            where: { id: restockId },
            data: { ...restockData },
        });

        return tx.restock.findUnique({
            where: { id: restock.id },
        });
    });
};


const findById = (id: string) => {
    return prisma.restock.findUnique({
        where: { id },
    });
};


const findByUserId = (userId: string) => {
    return prisma.restock.findMany({
        where: { userId },
    });
};

const findAll = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const data = await prisma.restock.findMany({
        skip,
        take: limit,
        include: {
            user: true,
            items: true,
        }
    });

    const total = await prisma.restock.count();

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


export const restockRepository = {
    create,
    update,
    findByUserId,
    findById,
    findAll

}


