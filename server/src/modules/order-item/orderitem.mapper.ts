export const toOrderItemResponse = (orderItem: any) => ({
    id: orderItem.id,
    productId: orderItem.productId,
    orderId: orderItem.orderId,
    quantity: orderItem.quantity,
    price: orderItem.price,
});

export const toOrderItemListResponse = (orderItems: any[]) => {
    return orderItems.map((orderItem) => toOrderItemResponse(orderItem));
};