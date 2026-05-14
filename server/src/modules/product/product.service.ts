import { productRepository } from "./product.repository";
import type { CreateProductDTO, UpdateProductDTO } from "./product.types";
import { BadRequestError, ConflictError, NotFoundError } from "../../errors/types";

const registerProduct = async (data: CreateProductDTO) => {
    const existing = await productRepository.findByName(data.name);
    if (existing) throw new ConflictError("Name already registered");

    return await productRepository.create(data);
};

const updateProduct = async (id: string, data: UpdateProductDTO) => {

    const existing = await productRepository.findById(id);
    if (!existing) throw new NotFoundError("Product not found");

    if (!Object.keys(data).length)
        throw new BadRequestError("No Data Provided");

    return productRepository.update(id, data);

};

const listProducts = async (page: number, limit: number) => {
    return productRepository.findAll(page, limit);
};

export const productService = {
    registerProduct,
    updateProduct,
    listProducts,
}