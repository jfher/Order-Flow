export const toProductResponse = (product: any) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,
});

export const toProductListResponse = (products: any[]) => {
    return products.map((product) => toProductResponse(product));
};