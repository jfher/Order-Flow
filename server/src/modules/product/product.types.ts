export type CreateProductDTO = {
    name: string;
    description?: string;
    price: number;
    stock: number;
    category: string;
};

export type UpdateProductDTO = {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    category?: string;
};
