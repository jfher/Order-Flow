export const toAuthResponse = (user: any, token: string) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: token,
});