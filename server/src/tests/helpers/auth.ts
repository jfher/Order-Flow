import request from "supertest";
import { app } from "../../server";
import { createTestUser } from "./factories/user.factory";

export const getAuthToken = async () => {

    const user = await createTestUser();
    const login = await request(app)
        .post("/api/v1/auth/login")
        .send({
            email: user.email,
            password: "123456",
        });

    return login.body.data.token;
};
