import { Router } from "express";
import cors from 'cors'

import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { clientRoutes } from "../modules/client/client.routes";
import { productRoutes } from "../modules/product/product.routes";

import { authenticate } from "../middlewares/auth.middleware";
import { orderRoutes } from "../modules/order/order.routes";
import { restockRoutes } from "../modules/restock/restock.routes";

export const router = Router();
router.use(cors({ origin: "http://localhost:5173", credentials: true }));

router.use(`/auth`, authRoutes);
router.use(`/users`, authenticate, userRoutes);
router.use(`/clients`, authenticate, clientRoutes);
router.use(`/products`, authenticate, productRoutes);
router.use(`/orders`, authenticate, orderRoutes);
router.use(`/restocks`, authenticate, restockRoutes);

