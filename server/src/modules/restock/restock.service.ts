import { restockRepository } from "./restock.repository";
import type { CreateRestockDTO, UpdateRestockDTO } from "./restock.types";
import { BadRequestError, NotFoundError } from "../../errors/types";
import { userRepository } from "../user/user.repository";
import { restockItemService } from "../restock-item/restockitem.service";
import { productRepository } from "../product/product.repository";
import { productService } from "../product/product.service";

const registerRestock = async (data: CreateRestockDTO) => {
    const existingUser = await userRepository.findById(data.userId);
    if (!existingUser) throw new NotFoundError("User Id is invalid");

    const restock = await restockRepository.create(data);

    if (data.items?.length) {
        const items = await Promise.all(data.items.map(async (item) => {
            const existingProduct = await productRepository.findById(item.productId)
            if (!existingProduct) throw new NotFoundError("Product Id is invalid");

            await productService.updateProduct(existingProduct.id, { stock: existingProduct.stock + item.quantity });

            return {
                ...item,
                restockId: restock.id,
            }
        }));
        await restockItemService.registerRestockItems(items);
    }

    return restock;
};

const updateRestock = async (id: string, data: UpdateRestockDTO) => {
    const existing = await restockRepository.findById(id);
    if (!existing) throw new NotFoundError("Restock not found");

    if (!Object.keys(data).length)
        throw new BadRequestError("No Data Provided");

    if (data.userId) {
        const existingUser = await userRepository.findById(data.userId);
        if (!existingUser) throw new NotFoundError("User Id is invalid");
    }

    if (data.items?.length) {

        const currentItems = await restockItemService.findRestockItemsByRestockId(id);
        const newItems = data.items?.filter((item) => !currentItems.some((currentItem) => currentItem.productId === item.productId));
        const deletedItems = currentItems.filter((currentItem) => !data.items?.some((item) => item.productId === currentItem.productId));

        if (newItems.length) {
            await restockItemService.registerRestockItems(newItems);
            newItems.forEach(async (item) => {
                const existingProduct = await productRepository.findById(item.productId)
                if (!existingProduct) throw new NotFoundError("Product Id is invalid");

                productService.updateProduct(existingProduct.id, { stock: existingProduct.stock + item.quantity });
            });
        };

        if (deletedItems.length) {
            await restockItemService.deleteMany(deletedItems.map((item) => item.id));
            deletedItems.forEach(async (item) => {
                const existingProduct = await productRepository.findById(item.productId)
                if (!existingProduct) throw new NotFoundError("Product Id is invalid");

                productService.updateProduct(existingProduct.id, { stock: existingProduct.stock - item.quantity });
            });
        };

    }

    return restockRepository.update(id, data);
};

const listRestocks = async (page: number, limit: number) => {
    return restockRepository.findAll(page, limit);
};

export const restockService = {
    registerRestock,
    updateRestock,
    listRestocks,
}