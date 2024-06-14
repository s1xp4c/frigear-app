import {CreateProduct, Product, UpdateProduct} from "@/lib/repositories/product";
import {NotFoundError} from "@/lib/errors";
import {copycat} from "@snaplet/copycat";
import {IRepository} from "@/lib/types";
import {IPriceRepository} from "@/lib/repositories/product/stripe-price-repository";
import {IProductRepository} from "@/lib/repositories/product/supabase-product-repository";

export default class MockRepository<
    Key extends  any = string,
    Entity extends object = Product,
    Create extends object = CreateProduct,
    Update extends object = UpdateProduct,
> implements IRepository<Key, Entity, Create, Update> {
    constructor(
        private state: Entity[] = [],
        private mapping: {
            id: string;
            slug: string;
            secondary_id: string;
        } = {
            id: 'id',
            slug: 'slug',
            secondary_id: 'stripe_id',
        }
    ) {
    }

    async all(): Promise<Entity[]> {
        return this.state;
    }

    async getById(id: Key): Promise<Entity> {
        const entity = this.state.find(row => row[this.mapping.id as never] === id);
        if (!entity) {
            throw new NotFoundError();
        }
        return entity;
    }

    async getBySlug(slug: string): Promise<Entity> {
        const entity = this.state.find(row => row[this.mapping.slug as never] === slug);
        if (!entity) {
            throw new NotFoundError();
        }
        return entity;
    }

    async getBySecondaryId(stripeId: string): Promise<Entity> {
        const product = this.state.find(row => row[this.mapping.secondary_id as never] === stripeId);
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

    async updateById(id: Key, attributes: Partial<Update>): Promise<Entity> {
        const index = this.state.findIndex(row => row[this.mapping.id as never] === id);

        if (index === -1) {
            throw new NotFoundError();
        }

        return this.state[index] = {...this.state[index], ...attributes};
    }

    async deleteById(id: Key): Promise<void> {
        const index = this.state.findIndex(row => row[this.mapping.id as never] === id);
        if (index === -1) {
            throw new NotFoundError();
        }

        this.state.splice(index, 1);
    }

    async deleteAll(): Promise<void> {
        this.state = [];
    }
}