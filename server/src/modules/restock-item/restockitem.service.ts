import { restockItemRepository } from "./restockitem.repository";
import { BadRequestError, NotFoundError } from "../../errors/types";
import type { CreateRestockItemDTO, UpdateRestockItemDTO } from "./restockitem.types";

const registerRestockItem = async (data: CreateRestockItemDTO) => {
    const existingRestock = await restockItemRepository.findByRestockId(data.restockId);
    if (!existingRestock) throw new NotFoundError("RestockID is Invalid!");

    const existingProduct = await restockItemRepository.findByProductId(data.productId);
    if (!existingProduct) throw new NotFoundError("ProductId is Invalid!");

    return await restockItemRepository.create(data);
};


const registerRestockItems = async (data: CreateRestockItemDTO[]) => {
    if (!data?.length)
        throw new BadRequestError("No Data Provided");

    await Promise.all(data.map(async (item) => {
        if (item.restockId) {
            const existingRestock = await restockItemRepository.findByRestockId(item.restockId);
            if (!existingRestock) throw new NotFoundError("RestockID is Invalid!");
        }
        if (item.productId) {
            const existingProduct = await restockItemRepository.findByProductId(item.productId);
            if (!existingProduct) throw new NotFoundError("ProductId is Invalid!");
        }
    }))

    return await restockItemRepository.createMany(data);
};

const updateRestockItem = async (id: string, data: UpdateRestockItemDTO) => {

    const existing = await restockItemRepository.findById(id);
    if (!existing) throw new NotFoundError("OrderItem not found");

    if (!Object.keys(data).length)
        throw new BadRequestError("No Data Provided");
    return restockItemRepository.update(id, data);
};

const listRestockItems = async (page: number, limit: number) => {
    return restockItemRepository.findAll(page, limit);
};

const findRestockItemsByRestockId = (restockId: string) => {
    return restockItemRepository.findByRestockId(restockId);
}

const deleteMany = async (orderItemIds: string[]) => {
    await restockItemRepository.deleteMany(orderItemIds);
}

export const restockItemService = {
    registerRestockItem,
    registerRestockItems,
    updateRestockItem,
    listRestockItems,
    findRestockItemsByRestockId,
    deleteMany
}