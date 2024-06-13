import {CreateProduct, Product, ProductRepository, UpdateProduct} from "@/lib/repositories/product/product-repository";
import {translateSupabaseError} from "@/utils/supabase/middleware";

export interface IProductService {
    all(): Promise<Product[]>;

    getById(id: string): Promise<Product>;

    getBySlug(slug: string): Promise<Product>;

    create(product: CreateProduct): Promise<Product>;

    updateById(id: string, attributes: UpdateProduct): Promise<Product>;

    deleteById(id: string): Promise<void>;

    deleteAll(): Promise<void>;
}

export default class ProductService implements IProductService {
    constructor(
        private repository: ProductRepository,
    ) {
    }

    async deleteAll(): Promise<void> {
        await this.repository.deleteAll();
    }

    async all(): Promise<Product[]> {
        return await this.repository.all();
    }

    async getById(id: string): Promise<Product> {
        return await this.repository.getById(id);
    }

    async getBySlug(slug: string): Promise<Product> {
        return await this.repository.getBySlug(slug);
    }

    async create(product: CreateProduct): Promise<Product> {
        return await this.repository.create(product);
    }

    async updateById(id: string, attributes: UpdateProduct): Promise<Product> {
        return await this.repository.updateById(id, attributes);
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.deleteById(id);
    }

}