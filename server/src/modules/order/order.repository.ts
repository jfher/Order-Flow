import type { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../configs/prisma";
import type { CreateOrderDTO, UpdateOrderDTO } from "./order.types";

const create = async (data: CreateOrderDTO) => {
    const { items, ...orderData } = data;

    return prisma.$transaction(async (tx) => {

        const order = await tx.order.create({
            data: { ...orderData },
        });

        return order
    });
};


const update = async (orderId: string, data: UpdateOrderDTO) => {
    const { items, ...orderData } = data;

    return prisma.$transaction(async (tx) => {
        const order = await tx.order.update({
            where: { id: orderId },
            data: { ...orderData },
        });

        return tx.order.findUnique({
            where: { id: order.id },
        });
    });
};


const findById = (id: string) => {
    return prisma.order.findUnique({
        where: { id },
    });
};

const findByStatus = (status: OrderStatus) => {
    return prisma.order.findMany({
        where: { status },
    });
};

const findByClientId = (clientId: string) => {
    return prisma.order.findMany({
        where: { clientId },
    });
};

const findByUserId = (userId: string) => {
    return prisma.order.findMany({
        where: { userId },
    });
};

const findAll = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const data = await prisma.order.findMany({
        skip,
        take: limit,
        include: {
            user: true,
            client: true,
            items: true,
            payment: true,
            delivery: true
        }
    });
    console.log(data)

    const total = await prisma.order.count();

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


export const orderRepository = {
    create,
    update,
    findByStatus,
    findByClientId,
    findByUserId,
    findById,
    findAll

}


