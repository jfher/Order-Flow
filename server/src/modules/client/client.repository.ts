import { prisma } from "../../configs/prisma";
import type { CreateClientDTO, UpdateClientDTO } from "./client.types";

const create = async (data: CreateClientDTO) => {
    const { ...clientData } = data;

    return prisma.$transaction(async (tx) => {

        const client = await tx.client.create({
            data: { ...clientData },
        });
        return client
    });
};


const update = async (clientId: string, data: UpdateClientDTO) => {
    const { ...clientData } = data;

    return prisma.$transaction(async (tx) => {
        const client = await tx.client.update({
            where: { id: clientId },
            data: { ...clientData, },
        });

        return tx.client.findUnique({
            where: { id: client.id },
        });
    });
};


const findById = (id: string) => {
    return prisma.client.findUnique({
        where: { id },
    });
};

const findByName = (name: string) => {
    return prisma.client.findFirst({
        where: { name },
    });
};

const findAll = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const data = await prisma.client.findMany({
        skip,
        take: limit,
    });

    const total = await prisma.client.count();

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


export const clientRepository = {
    create,
    update,
    findByName,
    findById,
    findAll

}


