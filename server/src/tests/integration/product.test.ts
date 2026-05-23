import request from "supertest";
import { app } from "../../server";
import { clearDB } from "../helpers/db";
import { getAuthToken } from "../helpers/auth";
import { describe, it, beforeEach, expect, test } from "vitest";
import { createTestProduct, registerTestProduct } from "../helpers/factories/product.factory";

describe("Products API", () => {
    beforeEach(async () => {
        await clearDB();
    });

    it("should get a 200 status code if the user is authenticated and also return the products", async () => {
        const token = await getAuthToken();
        const res = await request(app)
            .get("/api/v1/products")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({
            success: true,
            data: expect.arrayContaining([]),
            meta: expect.objectContaining({
                page: 1,
                limit: 10,
                total: 0,
                totalPages: 0
            })
        }));
    });

    it("should get a 200 status code if the user is authenticated and also return the products registered", async () => {
        const token = await getAuthToken();
        await registerTestProduct(token);

        const res = await request(app)
            .get("/api/v1/products")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.length).toBe(1);
        expect(res.body).toEqual(expect.objectContaining({
            meta: expect.objectContaining({
                page: 1,
                limit: 10,
                total: 1,
                totalPages: 1
            })
        }));
    });

    it("should get the products registered and use pagination correctly", async () => {
        const token = await getAuthToken();

        const productMock = {
            description: "Huevo pequeño de tercera clase",
            price: 20,
            stock: 45,
            category: "Concentrada"
        }

        const page = 1;
        const limit = 1;

        await registerTestProduct(token, { ...productMock, name: "Primera" });
        await registerTestProduct(token, { ...productMock, name: "Segunda" });
        await registerTestProduct(token, { ...productMock, name: "Tercera" });

        const res = await request(app)
            .get(`/api/v1/products?page=${page}&limit=${limit}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.length).toBe(1);
        expect(res.body).toEqual(expect.objectContaining({
            meta: expect.objectContaining({
                page: page,
                limit: limit,
                total: 3,
                totalPages: 3
            })
        }));
    });

    it("should get an error if the product data is not sended in the body", async () => {
        const token = await getAuthToken();

        const res = await request(app)
            .post("/api/v1/products")
            .set("Authorization", `Bearer ${token}`)

        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.objectContaining({
            message: "Validation error",
            errors: {}
        }));
    })

    it("should create the product if the product data is sended in the body", async () => {
        const token = await getAuthToken();

        const mock = {
            name: "Tercera",
            description: "Huevo pequeño de tercera clase",
            price: 20,
            stock: 45,
            category: "Concentrada"
        }

        const res = await registerTestProduct(token, mock);

        expect(res.status).toBe(201);
        expect(res.body).toEqual(expect.objectContaining({
            success: true,
            data: expect.objectContaining({
                id: expect.any(String),
                ...mock
            })
        }));
    })

    it("should return a 409 code if the product name is already registered", async () => {
        const token = await getAuthToken();
        const productMock = {
            name: "Tercera",
            description: "Huevo pequeño de tercera clase",
            price: 20,
            stock: 45,
            category: "Concentrada"
        }

        await createTestProduct(productMock);
        const res = await registerTestProduct(token, productMock);

        expect(res.status).toBe(409);
        expect(res.body).toEqual(expect.objectContaining({
            success: false,
            error: "Name already registered"
        }));
    })

    it("should show an error if the product data is not sended to update", async () => {
        const token = await getAuthToken()

        const product = await registerTestProduct(token);

        const res = await request(app)
            .patch(`/api/v1/products/${product.body.data.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({});

        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.objectContaining({
            error: "No Data Provided",
            success: false,
        }));
    })

    it("should update the product if the product data is sended in the body", async () => {
        const token = await getAuthToken()

        const product = await registerTestProduct(token);

        const productMockUpdated = {
            name: "Tercera updated"
        }

        const res = await request(app)
            .patch(`/api/v1/products/${product.body.data.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                ...productMockUpdated
            });

        expect(res.status).toBe(201);
        expect(res.body).toEqual(expect.objectContaining({
            success: true,
            data: expect.objectContaining({
                id: expect.any(String),
                name: productMockUpdated.name,
            })
        }));
    })
})