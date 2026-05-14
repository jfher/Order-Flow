// src/modules/auth/auth.service.ts
import { ConflictError, NotFoundError } from '../../errors/types'
import { comparePassword } from '../../utils/hash'
import { generateTokens } from '../../utils/jwt'
import { userRepository } from '../user/user.repository'
import { AuthRepository } from './auth.repository'


const loginUser = async (email: string, password: string) => {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new NotFoundError("User not found");

    const valid = await comparePassword(password, user.password);
    if (!valid) throw new ConflictError("Invalid Credentials");

    const { accessToken, refreshToken } = generateTokens(user.id);

    await AuthRepository.createSession({
        userId: user.id,
        token: accessToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return { user, accessToken, refreshToken };
};

const refreshTokenService = async (token: string) => {
    const session = await AuthRepository.findSessionByToken(token);
    if (!session) throw new NotFoundError("Invalid session");

    await AuthRepository.deleteSession(session.id);

    const { accessToken, refreshToken } = generateTokens(session.userId);

    await AuthRepository.createSession({
        userId: session.userId,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return { accessToken, refreshToken };
};

const logoutService = async (token: string) => {
    await AuthRepository.deleteSessionByToken(token);
};

export const AuthService = {
    loginUser,
    refreshTokenService,
    logoutService,
}