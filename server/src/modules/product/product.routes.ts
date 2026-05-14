import { Router } from "express";
import { getProducts, register, update } from "./product.controller";
import { productCreateSchema, productUpdateSchema } from "./product.validator";
import { validate } from "../../middlewares/validate.middleware";

export const productRoutes = Router();

productRoutes.get('/', getProducts);

productRoutes.post('/', validate(productCreateSchema), register)

productRoutes.patch('/:productId', validate(productUpdateSchema), update)