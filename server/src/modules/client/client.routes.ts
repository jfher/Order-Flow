import { Router } from "express";
import { getClients, register, update } from "./client.controller";
import { validate } from "../../middlewares/validate.middleware";
import { clientCreateSchema, clientUpdateSchema } from "./client.validator";

export const clientRoutes = Router();

clientRoutes.get('/', getClients);

clientRoutes.post('/', validate(clientCreateSchema), register)

clientRoutes.patch('/:clientId', validate(clientUpdateSchema), update)