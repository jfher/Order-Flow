import { prisma } from "../../configs/prisma";

export const clearDB = async () => {
    await prisma.auditLog.deleteMany();
    await prisma.restockItem.deleteMany();
    await prisma.restock.deleteMany();

    await prisma.delivery.deleteMany();

    await prisma.payment.deleteMany();

    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    await prisma.product.deleteMany();

    await prisma.client.deleteMany();

    await prisma.session.deleteMany();

    await prisma.user.deleteMany();
};