import z from "zod";

export const orderItemCreateSchema = z.object({
    orderId: z.string({ message: 'Order ID is required' }),
    productId: z.string({ message: 'Product ID is required' }),
    quantity: z.number({ message: 'Quantity is required' })
        .min(1, { error: 'Quantity must be at least 1' }),
    price: z.number({ message: 'Price is required' })
        .min(0, { error: 'Price must be at least 0' }),
});


export const orderItemUpdateSchema = z.object({
    orderId: z.string({ message: 'Order ID is required' }).optional(),
    productId: z.string({ message: 'Product ID is required' }).optional(),
    quantity: z.number({ message: 'Quantity is required' })
        .min(1, { error: 'Quantity must be at least 1' }).optional(),
    price: z.number({ message: 'Price is required' })
        .min(0, { error: 'Price must be at least 0' }).optional(),
});
