import z from "zod";

export const productCreateSchema = z.object({
    name: z.string({ message: 'Name is required' })
        .min(3, { error: 'Name must have at least 3 characters' })
        .max(20, { error: 'Name must have less than 20 characters' }),
    description: z.string({ message: 'Description is required' })
        .min(3, { error: 'Description must have at least 3 characters' })
        .max(100, { error: 'Description must have less than 100 characters' }),
    price: z.number({ message: 'Price is required' })
        .min(0, { error: 'Price must be greater than 0' }),
    stock: z.number({ message: 'Stock is required' })
        .min(0, { error: 'Stock must be greater than 0' }),
    category: z.string({ message: 'Category is required' }),
});


export const productUpdateSchema = z.object({
    name: z.string({ message: 'Name is required' })
        .min(3, { error: 'Name must have at least 3 characters' })
        .max(20, { error: 'Name must have less than 20 characters' }).optional(),
    description: z.string({ message: 'Description is required' })
        .min(3, { error: 'Description must have at least 3 characters' })
        .max(100, { error: 'Description must have less than 100 characters' }).optional(),
    price: z.number({ message: 'Price is required' })
        .min(0, { error: 'Price must be greater than 0' }).optional(),
    stock: z.number({ message: 'Stock is required' })
        .min(0, { error: 'Stock must be greater than 0' }).optional(),
    category: z.string({ message: 'Category is required' }).optional(),
});