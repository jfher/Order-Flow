export const toUserResponse = (user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
});

export const toUserListResponse = (users: any[]) => {
    return users.map((user) => toUserResponse(user));
};