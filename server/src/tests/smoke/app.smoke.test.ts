import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../../server";

describe("Smoke Test", () => {
    it("should return 404 status for not found routes", async () => {
        const res = await request(app).get("/");
        expect(res.status).toBe(404);
    });

    it("should return 401 status for unauthorized access", async () => {
        const res = await request(app).get("/api/v1/products");
        expect(res.status).toBe(401);
        expect(res.body).toEqual(
            expect.objectContaining({
                success: false,
                message: expect.any(String)
            })
        )
    });
});