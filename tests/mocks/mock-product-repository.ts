import {CreateProduct, Product, ProductRepository} from "@/lib/repositories/product/product-repository";
import {NotFoundError} from "@/lib/errors";
import {copycat} from "@snaplet/copycat";

export default class MockProductRepository implements ProductRepository {
    constructor(
        private state: Product[] = [],
    ) {
    }

    async all(): Promise<Product[]> {
        return this.state;
    }

    async getById(id: string): Promise<Product> {
        const product = this.state.find(row => row.id === id);
        if (!product) {
            throw new NotFoundError();
        }
        return product;
    }

    async getBySlug(slug: string): Promise<Product> {
        const product = this.state.find(row => row.slug === slug);
        if (!product) {
            throw new NotFoundError();
        }
        return product;
    }

    async getByStripeId(stripeId: string): Promise<Product> {
        const product = this.state.find(row => row.stripe_id === stripeId);
        if (!product) {
            throw new NotFoundError();
        }
        return product;
    }

    async create(product: CreateProduct): Promise<Product> {
        const index = this.state.push({
            id: copycat.uuid(JSON.stringify(product)),
            ...product,
        } as Product);

        return this.state[index];
    }

    async updateById(id: string, attributes: Partial<CreateProduct>): Promise<Product> {
        const index = this.state.findIndex(row => row.id === id);

        if (index === -1) {
            throw new NotFoundError();
        }

        return this.state[index] = {...this.state[index], ...attributes};
    }

    async deleteById(id: string): Promise<void> {
        const index = this.state.findIndex(row => row.id === id);
        if (index === -1) {
            throw new NotFoundError();
        }

        this.state.splice(index, 1);
    }

    async deleteAll(): Promise<void> {
        this.state = [];
    }
}