export type CreateOrderItemDTO = {
    id?: string,
    orderId: string,
    productId: string,
    quantity: number,
    price: number
}

export type UpdateOrderItemDTO = {
    id?: string,
    orderId?: string,
    productId?: string,
    quantity?: number,
    price?: number
}