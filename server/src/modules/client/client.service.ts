import { clientRepository } from "./client.repository";
import type { CreateClientDTO, UpdateClientDTO } from "./client.types";
import { BadRequestError, ConflictError, NotFoundError } from "../../errors/types";

const registerClient = async (data: CreateClientDTO) => {
    const existing = await clientRepository.findByName(data.name);
    if (existing) throw new ConflictError("Name already registered");

    return await clientRepository.create(data);
};

const updateClient = async (id: string, data: UpdateClientDTO) => {

    const existing = await clientRepository.findById(id);
    if (!existing) throw new NotFoundError("Client not found");

    if (!Object.keys(data).length)
        throw new BadRequestError("No Data Provided");

    return clientRepository.update(id, data);

};

const listClients = async (page: number, limit: number) => {
    return clientRepository.findAll(page, limit);
};

export const clientService = {
    registerClient,
    updateClient,
    listClients,
}