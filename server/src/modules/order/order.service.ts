import { orderRepository } from "./order.repository";
import type { CreateOrderDTO, UpdateOrderDTO } from "./order.types";
import { BadRequestError, NotFoundError } from "../../errors/types";
import { clientRepository } from "../client/client.repository";
import { userRepository } from "../user/user.repository";
import { orderItemService } from "../order-item/orderitem.service";


const registerOrder = async (data: CreateOrderDTO) => {
    const existingUser = await userRepository.findById(data.userId);
    if (!existingUser) throw new NotFoundError("User Id is invalid");

    const existingClient = await clientRepository.findById(data.clientId);
    if (!existingClient) throw new NotFoundError("Client Id is invalid");

    const order = await orderRepository.create(data);

    if (data.items?.length) {
        const items = data.items.map((item) => ({
            ...item,
            orderId: order.id,
        }));
        await orderItemService.registerOrderItems(items);
    }

    return order;
};

const updateOrder = async (id: string, data: UpdateOrderDTO) => {
    const existing = await orderRepository.findById(id);
    if (!existing) throw new NotFoundError("Order not found");

    if (!Object.keys(data).length)
        throw new BadRequestError("No Data Provided");

    if (data.userId) {
        const existingUser = await userRepository.findById(data.userId);
        if (!existingUser) throw new NotFoundError("User Id is invalid");
    }

    if (data.clientId) {
        const existingClient = await clientRepository.findById(data.clientId);
        if (!existingClient) throw new NotFoundError("Client Id is invalid");
    }

    if (data.items?.length) {

        const currentItems = await orderItemService.findOrderItemsByOrderId(id);
        const newItems = data.items?.filter((item) => !currentItems.some((currentItem) => currentItem.productId === item.productId));
        const deletedItems = currentItems.filter((currentItem) => !data.items?.some((item) => item.productId === currentItem.productId));

        if (newItems.length) await orderItemService.registerOrderItems(newItems);
        if (deletedItems.length) await orderItemService.deleteMany(deletedItems.map((item) => item.id));
    }

    return orderRepository.update(id, data);
};

const listOrders = async (page: number, limit: number) => {
    return orderRepository.findAll(page, limit);
};

export const orderService = {
    registerOrder,
    updateOrder,
    listOrders,
}