import z from "zod";

export const restockItemCreateSchema = z.object({
    restockId: z.string({ message: 'Restock ID is required' }),
    productId: z.string({ message: 'Product ID is required' }),
    quantity: z.number({ message: 'Quantity is required' })
        .min(1, { error: 'Quantity must be at least 1' }),
});


export const restockItemUpdateSchema = z.object({
    restockId: z.string({ message: 'Restock ID is required' }).optional(),
    productId: z.string({ message: 'Product ID is required' }).optional(),
    quantity: z.number({ message: 'Quantity is required' })
        .min(1, { error: 'Quantity must be at least 1' }).optional(),
});
