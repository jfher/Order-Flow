import type { Request, Response, NextFunction } from 'express';
import { userService } from "./user.service";
import { toUserResponse } from './user.mapper';

export const register = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json({
            success: true,
            data: toUserResponse(user)
        });
    } catch (error) {
        next(error)
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userId = req.params.userId as string;

        if (!userId) return res.status(400).json({
            success: false,
            error: "UserId paramater is required"
        })

        const user = await userService.updateUser(userId, req.body);

        res.status(201).json({
            success: true,
            data: toUserResponse(user)
        });
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await userService.listUsers(page, limit);

        res.status(200).json({
            success: true,
            ...result
        });
    } catch (error) {
        next(error);
    }
};