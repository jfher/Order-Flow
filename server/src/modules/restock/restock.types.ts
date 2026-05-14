import type { CreateRestockItemDTO } from "../restock-item/restockitem.types";

export type CreateRestockDTO = {
    userId: string;
    note?: string;
    items?: CreateRestockItemDTO[]
};

export type UpdateRestockDTO = {
    userId: string;
    note?: string;
    items?: CreateRestockItemDTO[];
};
