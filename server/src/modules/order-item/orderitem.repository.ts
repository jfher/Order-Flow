import { prisma } from "../../configs/prisma";
import type { CreateOrderItemDTO, UpdateOrderItemDTO } from "./orderitem.types";

const create = async (data: CreateOrderItemDTO) => {
    const { ...orderItemData } = data;

    return prisma.$transaction(async (tx) => {

        const orderItem = await tx.orderItem.create({
            data: { ...orderItemData },
        });
        return orderItem
    });
};

const createMany = async (data: CreateOrderItemDTO[]) => {
    return prisma.$transaction(async (tx) => {
        const orderItems = await tx.orderItem.createMany({
            data,
        });
        return orderItems
    });
};


const update = async (orderItemId: string, data: UpdateOrderItemDTO) => {
    const { ...orderItemData } = data;

    return prisma.$transaction(async (tx) => {
        const orderItem = await tx.orderItem.update({
            where: { id: orderItemId },
            data: { ...orderItemData },
        });

        return tx.orderItem.findUnique({
            where: { id: orderItem.id },
        });
    });
};


const findById = (id: string) => {
    return prisma.orderItem.findUnique({
        where: { id },
    });
};

const findByOrderId = (orderId: string) => {
    return prisma.orderItem.findMany({
        where: { orderId },
    });
};

const findByProductId = (productId: string) => {
    return prisma.orderItem.findMany({
        where: { productId },
    });
};


const findAll = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const data = await prisma.orderItem.findMany({
        skip,
        take: limit,
    });

    const total = await prisma.orderItem.count();

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

const deleteMany = (orderItemIds: string[]) => {
    return prisma.orderItem.deleteMany({
        where: { id: { in: orderItemIds } },
    });
}


export const orderItemRepository = {
    create,
    update,
    findById,
    findByOrderId,
    findByProductId,
    findAll,
    createMany,
    deleteMany


}


