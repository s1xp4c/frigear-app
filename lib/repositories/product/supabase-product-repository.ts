import type {SupabaseClient} from "@supabase/supabase-js";
import {CreateProduct, Product, UpdateProduct} from "@/lib/repositories/product/index";
import {translateSupabaseError} from "@/utils/supabase/middleware";
import {NotFoundError} from "@/lib/errors";
import type {IRepository} from "@/lib/types";

export interface IProductRepository extends IRepository<string, Product, CreateProduct, UpdateProduct> {

}

export default class SupabaseProductRepository implements IProductRepository {
    private select = '*';

    constructor(
        private client: SupabaseClient
    ) {
    }

    async all() {
        const {data, error} = await this.client
            .from('product')
            .select<typeof this.select, Product>(this.select);
        await translateSupabaseError(error);
        if (!data) throw new NotFoundError();

        return data
    }

    async getById(id: string): Promise<Product> {
        const {data, error} = await this.client
            .from('product')
            .select<typeof this.select, Product>(this.select)
            .eq('id', id)
            .maybeSingle();

        await translateSupabaseError(error);

        return data as Product;
    }

    async getBySlug(slug: string): Promise<Product> {
        const {data, error} = await this.client
            .from('product')
            .select<typeof this.select, Product>(this.select)
            .eq('slug', slug)
            .maybeSingle();

        await translateSupabaseError(error);
        if (!data) throw new NotFoundError();

        return data as Product;
    }

    async getBySecondaryId(stripeId: string): Promise<Product> {
        const {data, error} = await this.client
            .from('product')
            .select<typeof this.select, Product>(this.select)
            .eq('stripe_id', stripeId)
            .maybeSingle();

        await translateSupabaseError(error);
        if (!data) throw new NotFoundError();

        return data as Product;
    }

    async create(attributes: CreateProduct): Promise<Product> {
        const {data, error} = await this.client
            .from('product')
            .insert(attributes)
            .select<typeof this.select, Product>(this.select)
            .maybeSingle();

        await translateSupabaseError(error)

        if (!data) throw new Error('Could not create product.');

        return data as Product;
    }

    async updateById(id: string, attributes: UpdateProduct): Promise<Product> {
        const {data, error} = await this.client
            .from('product')
            .update(attributes)
            .eq('id', id)
            .select<typeof this.select, Product>(this.select)
            .single();

        await translateSupabaseError(error);

        return data as Product;
    }

    async deleteById(id: string): Promise<void> {
        const {error} = await this.client
            .from('product')
            .delete()
            .eq('id', id);

        await translateSupabaseError(error);
    }

    async deleteAll(): Promise<void> {
        const {error} = await this.client.from('product')
            .delete({count: 'exact'})
            .in('active', [true, false]);

        await translateSupabaseError(error);
    }
}