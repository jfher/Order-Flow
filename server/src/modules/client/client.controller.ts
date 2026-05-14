import type { Request, Response, NextFunction } from 'express';
import { clientService } from "./client.service";
import { toClientResponse } from './client.mapper';

export const register = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const client = await clientService.registerClient(req.body);
        res.status(201).json({
            success: true,
            data: toClientResponse(client)
        });
    } catch (error) {
        next(error)
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const clientId = req.params.clientId as string;

        if (!clientId) return res.status(400).json({
            success: false,
            error: "Client Id paramater is required"
        })

        const client = await clientService.updateClient(clientId, req.body);

        res.status(201).json({
            success: true,
            data: toClientResponse(client)
        });
    } catch (error) {
        next(error);
    }
};

export const getClients = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await clientService.listClients(page, limit);

        res.status(200).json({
            success: true,
            ...result
        });
    } catch (error) {
        next(error);
    }
};