import type { Request, Response, NextFunction } from 'express';
import { orderService } from './order.service';
import { toOrderListResponse, toOrderResponse } from './order.mapper';

export const register = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const order = await orderService.registerOrder(req.body);
        console.log(req.body)
        res.status(201).json({
            success: true,
            data: toOrderResponse(order)
        });
    } catch (error) {
        next(error)
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const orderId = req.params.orderId as string;

        if (!orderId) return res.status(400).json({
            success: false,
            error: "Order Id paramater is required"
        })

        const order = await orderService.updateOrder(orderId, req.body);

        res.status(201).json({
            success: true,
            data: toOrderResponse(order)
        });
    } catch (error) {
        next(error);
    }
};

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await orderService.listOrders(page, limit);

        res.status(200).json({
            success: true,
            ...result,
            data: toOrderListResponse(result.data)
        });
    } catch (error) {
        next(error);
    }
};