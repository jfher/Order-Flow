import z from "zod";

export const restockCreateSchema = z.object({
    userId: z.string({ message: 'UserId is required' }),
    note: z.string().optional(),
    items: z.array(z.object({
        id: z.string().optional(),
        productId: z.string({ message: 'ProductId is required' }),
        quantity: z.number({ message: 'Quantity is required' }),
    })).optional(),
});

export const restockUpdateSchema = z.object({
    userId: z.string({ message: 'UserId is required' }).optional(),
    note: z.string().optional(),
    items: z.array(z.object({
        id: z.string().optional(),
        productId: z.string({ message: 'ProductId is required' }),
        quantity: z.number({ message: 'Quantity is required' }),
    })).optional(),
});