import type { Request, Response, NextFunction } from 'express';
import { restockService } from './restock.service';
import { toRestockListResponse, toRestockResponse } from './restock.mapper';

export const register = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const restock = await restockService.registerRestock(req.body);
        res.status(201).json({
            success: true,
            data: toRestockResponse(restock)
        });
    } catch (error) {
        next(error)
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const restockId = req.params.restockId as string;

        if (!restockId) return res.status(400).json({
            success: false,
            error: "Restock Id paramater is required"
        })

        const restock = await restockService.updateRestock(restockId, req.body);

        res.status(201).json({
            success: true,
            data: toRestockResponse(restock)
        });
    } catch (error) {
        next(error);
    }
};

export const getRestocks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await restockService.listRestocks(page, limit);

        res.status(200).json({
            success: true,
            ...result,
            data: toRestockListResponse(result.data)
        });
    } catch (error) {
        next(error);
    }
};