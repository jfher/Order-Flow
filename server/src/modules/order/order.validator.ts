import z from "zod";
import { OrderStatus } from "../../../generated/prisma/enums";

export const orderCreateSchema = z.object({
    userId: z.string({ message: 'UserId is required' }),
    clientId: z.string({ message: 'ClientId is required' }),
    status: z.enum([OrderStatus.PENDING, OrderStatus.CONFIRMED, OrderStatus.PREPARING, OrderStatus.DISPATCHED, OrderStatus.DELIVERED, OrderStatus.CANCELLED], { error: 'Invalid status' }),
    total: z.number({ message: 'Total is required' }),
    items: z.array(z.object({
        id: z.string().optional(),
        productId: z.string({ message: 'ProductId is required' }),
        quantity: z.number({ message: 'Quantity is required' }),
        price: z.number({ message: 'Price is required' }),
    })).optional(),
});


export const orderUpdateSchema = z.object({
    userId: z.string({ message: 'UserId is required' }).optional(),
    clientId: z.string({ message: 'ClientId is required' }).optional(),
    status: z.enum([OrderStatus.PENDING, OrderStatus.CONFIRMED, OrderStatus.PREPARING, OrderStatus.DISPATCHED, OrderStatus.DELIVERED, OrderStatus.CANCELLED], { error: 'Invalid status' }).optional(),
    total: z.number({ message: 'Total is required' }).optional(),
    items: z.array(z.object({
        id: z.string().optional(),
        productId: z.string({ message: 'ProductId is required' }),
        quantity: z.number({ message: 'Quantity is required' }),
        price: z.number({ message: 'Price is required' }),
    })).optional(),
});