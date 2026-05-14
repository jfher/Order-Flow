import { prisma } from "../../configs/prisma";
import type { CreateProductDTO, UpdateProductDTO } from "./product.types";

const create = async (data: CreateProductDTO) => {
    const { ...productData } = data;

    return prisma.$transaction(async (tx) => {

        const product = await tx.product.create({
            data: { ...productData },
        });
        return product
    });
};


const update = async (productId: string, data: UpdateProductDTO) => {
    const { ...productData } = data;

    return prisma.$transaction(async (tx) => {
        const product = await tx.product.update({
            where: { id: productId },
            data: { ...productData },
        });

        return tx.product.findUnique({
            where: { id: product.id },
        });
    });
};


const findById = (id: string) => {
    return prisma.product.findUnique({
        where: { id },
    });
};

const findByName = (name: string) => {
    return prisma.product.findFirst({
        where: { name },
    });
};

const findByCategory = (category: string) => {
    return prisma.product.findFirst({
        where: { category },
    });
};

const findAll = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const data = await prisma.product.findMany({
        skip,
        take: limit,
    });

    const total = await prisma.product.count();

    return {
        data,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};


export const productRepository = {
    create,
    update,
    findByName,
    findByCategory,
    findById,
    findAll

}


