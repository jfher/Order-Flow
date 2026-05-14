import { Router } from "express";
import { getOrders, register, update } from "./order.controller";
import { orderCreateSchema, orderUpdateSchema } from "./order.validator";
import { validate } from "../../middlewares/validate.middleware";

export const orderRoutes = Router();

orderRoutes.get('/', getOrders);

orderRoutes.post('/', validate(orderCreateSchema), register)

orderRoutes.patch('/:orderId', validate(orderUpdateSchema), update)