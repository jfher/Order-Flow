import { orderItemRepository } from "./orderitem.repository";
import { BadRequestError, ConflictError, NotFoundError } from "../../errors/types";
import type { CreateOrderItemDTO, UpdateOrderItemDTO } from "./orderitem.types";

const registerOrderItem = async (data: CreateOrderItemDTO) => {
    const existingOrder = await orderItemRepository.findByOrderId(data.orderId);
    if (!existingOrder) throw new NotFoundError("OrderID is Invalid!");

    const existingProduct = await orderItemRepository.findByProductId(data.productId);
    if (!existingProduct) throw new NotFoundError("ProductId is Invalid!");

    return await orderItemRepository.create(data);
};


const registerOrderItems = async (data: CreateOrderItemDTO[]) => {
    if (!data?.length)
        throw new BadRequestError("No Data Provided");

    await Promise.all(data.map(async (item) => {
        if (item.orderId) {
            const existingOrder = await orderItemRepository.findByOrderId(item.orderId);
            if (!existingOrder) throw new NotFoundError("OrderID is Invalid!");
        }
        if (item.productId) {
            const existingProduct = await orderItemRepository.findByProductId(item.productId);
            if (!existingProduct) throw new NotFoundError("ProductId is Invalid!");
        }
    }))

    return await orderItemRepository.createMany(data);
};

const updateOrderItem = async (id: string, data: UpdateOrderItemDTO) => {

    const existing = await orderItemRepository.findById(id);
    if (!existing) throw new NotFoundError("OrderItem not found");

    if (!Object.keys(data).length)
        throw new BadRequestError("No Data Provided");
    return orderItemRepository.update(id, data);
};

const listOrderItems = async (page: number, limit: number) => {
    return orderItemRepository.findAll(page, limit);
};

const findOrderItemsByOrderId = (orderId: string) => {
    return orderItemRepository.findByOrderId(orderId);
}

const deleteMany = async (orderItemIds: string[]) => {
    await orderItemRepository.deleteMany(orderItemIds);
}

export const orderItemService = {
    registerOrderItem,
    registerOrderItems,
    updateOrderItem,
    listOrderItems,
    findOrderItemsByOrderId,
    deleteMany
}