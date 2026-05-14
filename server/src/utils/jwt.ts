import jwt from 'jsonwebtoken'

export const generateTokens = (userId: string) => {
    const accessToken = jwt.sign(
        { userId }, process.env.ACCESS_SECRET!,
        { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
        { userId },
        process.env.REFRESH_SECRET!,
        { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.ACCESS_SECRET!)
}