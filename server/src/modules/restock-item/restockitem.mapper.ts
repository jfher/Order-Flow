export const toRestockItemResponse = (restockItem: any) => ({
    id: restockItem.id,
    restockId: restockItem.restockId,
    productId: restockItem.productId,
    quantity: restockItem.quantity,
});

export const toRestockItemListResponse = (restockItems: any[]) => {
    return restockItems.map((restockItem) => toRestockItemResponse(restockItem));
};