import type { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { toAuthResponse } from "./auth.mapper";


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const { accessToken, user, refreshToken } = await AuthService.loginUser(
            email,
            password
        );

        res.status(200).json({
            success: true,
            data: toAuthResponse(user, accessToken)
        });
    } catch (error) {
        next(error);
    }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.refreshToken;

        const { accessToken, refreshToken } =
            await AuthService.refreshTokenService(token);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true
        });

        res.status(200).json({ accessToken });
    } catch (error: any) {
        next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.refreshToken;

        await AuthService.logoutService(token);

        res.clearCookie("refreshToken");
        res.status(204).json({ success: true });
    } catch (error: any) {
        next(error);
    }
};