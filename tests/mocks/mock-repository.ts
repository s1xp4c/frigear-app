import {CreateProduct, Product, UpdateProduct} from "@/lib/repositories/product";
import {NotFoundError} from "@/lib/errors";
import {copycat} from "@snaplet/copycat";
import {IRepository} from "@/lib/types";

export default class MockRepository<
    Entity extends object,
    Create extends object = CreateProduct,
    Update extends object = UpdateProduct,
> implements IRepository<string, Entity, Create, Update> {
    constructor(
        private state: Entity[] = [],
    ) {
    }

    async all(): Promise<Entity[]> {
        return this.state;
    }

    async getById(id: string): Promise<Entity> {
        const entity = this.state.find(row => row.id === id);
        if (!entity) {
            throw new NotFoundError();
        }
        return entity;
    }

    async getBySlug(slug: string): Promise<Entity> {
        const entity = this.state.find(row => row.slug === slug);
        if (!entity) {
            throw new NotFoundError();
        }
        return entity;
    }

    async getBySecondaryId(stripeId: string): Promise<Entity> {
        const product = this.state.find(row => row.stripe_id === stripeId);
        if (!product) {
            throw new NotFoundError();
        }
        return product;
    }

    async create(product: Create): Promise<Entity> {
        const index = this.state.push({
            id: copycat.uuid(JSON.stringify(product)),
            ...product,
        } as never as Entity);

        return this.state[index];
    }

    async updateById(id: string, attributes: Partial<Update>): Promise<Entity> {
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