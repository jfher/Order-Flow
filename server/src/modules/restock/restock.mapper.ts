export const toRestockResponse = (restock: any) => ({
    id: restock.id,
    userId: restock.userId,
    note: restock.note,
    createdAt: restock.createdAt,
    items: restock.items,
    user: restock.user,
});

export const toRestockListResponse = (restocks: any[]) => {
    return restocks.map((restock) => toRestockResponse(restock));
};