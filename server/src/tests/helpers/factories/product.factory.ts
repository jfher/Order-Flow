import request from "supertest";
import { prisma } from "../../../configs/prisma";
import { app } from "../../../server";

export const createTestProduct = async (productData?: any) => {

    if (productData) {
        return prisma.product.create({
            data: productData,
        });
    }

    return prisma.product.create({
        data: {
            name: "Product Test",
            description: "Description Test",
            price: 20,
            stock: 10,
            category: "Category Test",
        },
    });
};

export const registerTestProduct = async (token: string, payload: any = {
    name: "Tercera",
    description: "Huevo pequeño de tercera clase",
    price: 20,
    stock: 45,
    category: "Concentrada"
}) => {
    return await request(app)
        .post("/api/v1/products")
        .set("Authorization", `Bearer ${token}`)
        .send(payload);
}