import z from "zod";

export const RegisterSchema = z.object({
    name: z.string({ message: 'Name is required' })
        .min(3, { message: 'Name must have at least 3 characters' })
        .max(20, { message: 'Name must have less than 20 characters' }),
    email: z.string({ message: 'Email is required' })
        .email({ message: 'Email is not valid' })
        .max(50, { message: 'Email must have less than 50 characters' }),
    password: z.string({ message: 'Password is required' })
        .min(6, { message: 'Password must have at least 6 characters' })
        .max(20, { message: 'Password must have less than 20 characters' }),
})


export const LoginSchema = z.object({
    email: z.string({ message: 'Email is required' })
        .email({ message: 'Email is not valid' })
        .max(50, { message: 'Email must have less than 50 characters' }),
    password: z.string({ message: 'Password is required' })
        .min(6, { message: 'Password must have at least 6 characters' })
        .max(20, { message: 'Password must have less than 20 characters' }),
})