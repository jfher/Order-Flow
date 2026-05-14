import { prisma } from "../../configs/prisma";
import { toRestockItemListResponse } from "./restockitem.mapper";
import type { CreateRestockItemDTO, UpdateRestockItemDTO } from "./restockitem.types";

const create = async (data: CreateRestockItemDTO) => {
    const { ...restockItemData } = data;

    return prisma.$transaction(async (tx) => {

        const restockItem = await tx.restockItem.create({
            data: { ...restockItemData },
        });
        return restockItem
    });
};

const createMany = async (data: CreateRestockItemDTO[]) => {
    return prisma.$transaction(async (tx) => {
        const restockItems = await tx.restockItem.createMany({
            data,
        });
        return restockItems
    });
};


const update = async (restockItemId: string, data: UpdateRestockItemDTO) => {
    const { ...restockItemData } = data;

    return prisma.$transaction(async (tx) => {
        const restockItem = await tx.restockItem.update({
            where: { id: restockItemId },
            data: { ...restockItemData },
        });

        return tx.restockItem.findUnique({
            where: { id: restockItem.id },
        });
    });
};


const findById = (id: string) => {
    return prisma.restockItem.findUnique({
        where: { id },
    });
};

const findByRestockId = (restockId: string) => {
    return prisma.restockItem.findMany({
        where: { restockId },
    });
};

const findByProductId = (productId: string) => {
    return prisma.restockItem.findMany({
        where: { productId },
    });
};


const findAll = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const data = await prisma.restockItem.findMany({
        skip,
        take: limit,
    });

    const total = await prisma.restockItem.count();

    return {
        data: toRestockItemListResponse(data),
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};

const deleteMany = (restockItemIds: string[]) => {
    return prisma.restockItem.deleteMany({
        where: { id: { in: restockItemIds } },
    });
}


export const restockItemRepository = {
    create,
    update,
    findById,
    findByRestockId,
    findByProductId,
    findAll,
    createMany,
    deleteMany


}


