import { prisma } from '../../configs/prisma'

const createSession = (data: {
    userId: string;
    token: string;
    expiresAt: Date;
}) => {
    return prisma.session.create({ data });
};

const findSessionByToken = (token: string) => {
    return prisma.session.findFirst({
        where: { token }
    });
};

const deleteSession = (id: string) => {
    return prisma.session.delete({
        where: { id }
    });
};

const deleteSessionByToken = (token: string) => {
    return prisma.session.deleteMany({
        where: { token }
    });
};

export const AuthRepository = {
    createSession,
    findSessionByToken,
    deleteSession,
    deleteSessionByToken,
}