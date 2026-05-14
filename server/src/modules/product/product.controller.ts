import type { Request, Response, NextFunction } from 'express';
import { productService } from "./product.service";
import { toProductResponse } from './product.mapper';

export const register = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const product = await productService.registerProduct(req.body);
        res.status(201).json({
            success: true,
            data: toProductResponse(product)
        });
    } catch (error) {
        next(error)
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const productId = req.params.productId as string;

        if (!productId) return res.status(400).json({
            success: false,
            error: "ProductIdd paramater is required"
        })

        const product = await productService.updateProduct(productId, req.body);

        res.status(201).json({
            success: true,
            data: toProductResponse(product)
        });
    } catch (error) {
        next(error);
    }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await productService.listProducts(page, limit);

        res.status(200).json({
            success: true,
            ...result
        });
    } catch (error) {
        next(error);
    }
};