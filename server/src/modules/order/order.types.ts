import { OrderStatus } from "../../../generated/prisma/enums";
import type { CreateOrderItemDTO } from "../order-item/orderitem.types";

export type CreateOrderDTO = {
    userId: string;
    clientId: string;
    status: OrderStatus;
    total: number;
    items?: CreateOrderItemDTO[]
};

export type UpdateOrderDTO = {
    userId?: string;
    clientId?: string;
    status?: OrderStatus;
    total?: number;
    items?: CreateOrderItemDTO[];
};
