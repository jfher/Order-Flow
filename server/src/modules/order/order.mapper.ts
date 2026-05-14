export const toOrderResponse = (order: any) => ({
    id: order.id,
    userId: order.userId,
    clientId: order.clientId,
    status: order.status,
    total: order.total,
    createdAt: order.createdAt,
    payment: order.payment,
    delivery: order.delivery,
    user: order.user,
    client: order.client,
    items: order.items,
});

export const toOrderListResponse = (orders: any[]) => {
    return orders.map((order) => toOrderResponse(order));
};