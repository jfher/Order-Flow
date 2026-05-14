import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

export const errorHandler = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    //? Controlled errors in AppError
    if (err instanceof AppError) {

        return res.status(err.statusCode).json({
            success: false,
            error: err.message,
        });
    }

    //*Native errors
    if (err instanceof Error) {


        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }

    //! Unknown errors

    return res.status(500).json({
        success: false,
        error: "Internal Server Error",
    });
};