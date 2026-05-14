import type { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization

    if (!auth) {
        return res.status(401).json({ success: false, message: 'The token is needed to access!' })
    }

    try {
        const token = auth.split(' ')[1] as string;
        const decoded = verifyToken(token);
        (req as any).user = decoded
        next()
    } catch (error: any) {
        return res.status(403).json({ success: false, message: error.message })
    }
}