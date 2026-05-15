import { describe, it, expect, vi, beforeEach } from "vitest";
import { productService } from "../../modules/product/product.service";
import { productRepository } from "../../modules/product/product.repository";

vi.mock("../../modules/product/product.repository");

beforeEach(() => {
    vi.resetAllMocks();
})

describe("Product Service Tests", () => {
    it("should return return success true and an empty array of data", async () => {

        vi.mocked(productRepository.findAll).mockResolvedValue({
            success: true,
            data: [],
        } as any)

        const data = await productService.listProducts(1, 1);

        expect(productRepository.findAll).toHaveBeenCalledOnce();
        expect(data).toEqual(expect.objectContaining({
            data: [],
            success: true,
        }));
    })

    it("should return and empty array of data and meta with pagination", async () => {
        vi.mocked(productRepository.findAll).mockResolvedValue({
            success: true,
            data: [],
            meta: {
                total: 0,
                page: 1,
                limit: 1,
                totalPages: 1
            }
        } as any)

        const data = await productService.listProducts(1, 1);

        expect(productRepository.findAll).toHaveBeenCalledOnce();
        expect(productRepository.findAll).toHaveBeenCalledWith(1, 1);
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