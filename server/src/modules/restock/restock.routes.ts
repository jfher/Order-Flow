import { Router } from "express";
import { getRestocks, register, update } from "./restock.controller";
import { restockCreateSchema, restockUpdateSchema } from "./restock.validator";
import { validate } from "../../middlewares/validate.middleware";

export const restockRoutes = Router();

restockRoutes.get('/', getRestocks);

restockRoutes.post('/', validate(restockCreateSchema), register)

restockRoutes.patch('/:restockId', validate(restockUpdateSchema), update)