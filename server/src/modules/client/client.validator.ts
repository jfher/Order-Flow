import z from "zod";

export const clientCreateSchema = z.object({
    name: z.string({ message: 'Name is required' })
        .min(3, { error: 'Name must have at least 3 characters' })
        .max(20, { error: 'Name must have less than 20 characters' }),
    email: z.email({ message: 'Email format is not valid' }).optional(),
    phone: z.string({ message: 'Phone is required' }).min(7, { message: 'Phone must be at least 7 digits' }).max(8, { message: 'Phone must be less than 8 digits' }),
    address: z.string({ message: 'Address is required' }),
});


export const clientUpdateSchema = z.object({
    name: z.string({ message: 'Name is required' })
        .min(3, { error: 'Name must have at least 3 characters' })
        .max(20, { error: 'Name must have less than 20 characters' }).optional(),
    email: z.email({ message: 'Email format is not valid' }).optional(),
    phone: z.string({ message: 'Phone is required' }).min(7, { message: 'Phone must be at least 7 digits' }).max(8, { message: 'Phone must be less than 8 digits' }).optional(),
    address: z.string({ message: 'Address is required' }).optional(),
});