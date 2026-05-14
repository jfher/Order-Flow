import { Router } from "express";
import { getUsers, register, update } from "./user.controller";
import { userCreateSchema, userUpdateSchema } from "./user.validator";
import { validate } from "../../middlewares/validate.middleware";

export const userRoutes = Router();

userRoutes.get('/', getUsers);

userRoutes.post('/', validate(userCreateSchema), register)

userRoutes.patch('/:userId', validate(userUpdateSchema), update)