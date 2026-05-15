import request from "supertest";
import { app } from "../../server";
import { clearDB } from "../helpers/db";
import { getAuthToken } from "../helpers/auth";
import { describe, it, beforeEach, expect } from "vitest";

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

        const productMock = {
            name: "Tercera",
            description: "Huevo pequeño de tercera clase",
            price: 20,
            stock: 45,
            category: "Concentrada"
        }

        await request(app)
            .post("/api/v1/products")
            .set("Authorization", `Bearer ${token}`)
            .send(productMock);

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


        const productMock = {
            name: "Tercera",
            description: "Huevo pequeño de tercera clase",
            price: 20,
            stock: 45,
            category: "Concentrada"
        }

        const res = await request(app)
            .post("/api/v1/products")
            .set("Authorization", `Bearer ${token}`)
            .send(productMock);

        expect(res.status).toBe(201);
        expect(res.body).toEqual(expect.objectContaining({
            success: true,
            data: expect.objectContaining({
                id: expect.any(String),
                ...productMock
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

        await request(app)
            .post("/api/v1/products")
            .set("Authorization", `Bearer ${token}`)
            .send(productMock);

        const res = await request(app)
            .post("/api/v1/products")
            .set("Authorization", `Bearer ${token}`)
            .send(productMock);

        expect(res.status).toBe(409);
        expect(res.body).toEqual(expect.objectContaining({
            success: false,
            error: "Name already registered"
        }));
    })
})