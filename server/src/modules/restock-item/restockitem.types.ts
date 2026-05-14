export type CreateRestockItemDTO = {
    id?: string,
    restockId: string,
    productId: string,
    quantity: number,
}

export type UpdateRestockItemDTO = {
    id?: string,
    restockId?: string,
    productId?: string,
    quantity?: number,
}