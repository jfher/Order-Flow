import { describe, it, vi, beforeEach, expect } from "vitest";
import { clientRepository } from "../../modules/client/client.repository";
import { clientService } from "../../modules/client/client.service";

vi.mock("../../modules/client/client.repository");

beforeEach(() => {
    vi.resetAllMocks();
})

describe('Client Service', () => {

    it("should return return success true and an empty array of data", async () => {
        vi.mocked(clientRepository.findAll).mockResolvedValue({
            success: true,
            data: [],
        } as any)

        const data = await clientService.listClients(1, 1);

        expect(clientRepository.findAll).toHaveBeenCalledOnce();
        expect(data).toEqual(expect.objectContaining({
            data: [],
            success: true,
        }));

    })


    it("should return and empty array of data and meta with pagination", async () => {
        vi.mocked(clientRepository.findAll).mockResolvedValue({
            success: true,
            data: [],
            meta: {
                total: 0,
                page: 1,
                limit: 1,
                totalPages: 1
            }
        } as any)

        const data = await clientService.listClients(1, 1);

        expect(clientRepository.findAll).toHaveBeenCalledOnce();
        expect(clientRepository.findAll).toHaveBeenCalledWith(1, 1);
        expect(data).toEqual(expect.objectContaining({
            meta: expect.objectContaining({
                total: 0,
                page: 1,
                limit: 1,
                totalPages: 1
            })
        }));
    })

})