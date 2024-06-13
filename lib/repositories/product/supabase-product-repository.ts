import type {SupabaseClient} from "@supabase/supabase-js";
import {CreateProduct, Product, ProductRepository, UpdateProduct} from "@/lib/repositories/product/product-repository";
import {translateSupabaseError} from "@/utils/supabase/middleware";
import {NotFoundError, ValidationError} from "@/lib/errors";

export default class SupabaseProductRepository implements ProductRepository {
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

        if(!data) throw new NotFoundError();

        return data as Product;
    }

    async create(attributes: CreateProduct): Promise<Product> {
        const {data, error} = await this.client
            .from('product')
            .insert(attributes)
            .select<typeof this.select, Product>(this.select)
            .maybeSingle();

        //Catch duplicate field errors.
        if(error && error.code && error.code === '23505' && error.details){
            throw new ValidationError(error.details)
        }

        if(error) throw error;

        return data as Product;
    }

    async updateById(id: string, attributes: UpdateProduct): Promise<Product> {
        const {data, error} = await this.client
            .from('product')
            .update(attributes)
            .eq('id', id)
            .select<typeof this.select, Product>(this.select)
            .single();

        if(error) throw error;

        return data as Product;
    }

    async deleteById(id: string): Promise<void> {
        const {error} = await this.client
            .from('product')
            .delete()
            .eq('id', id);

        if(error) throw error;
    }

    async deleteAll(): Promise<void> {
        const {error} = await this.client.from('product')
            .delete({count: 'exact'})
            .in('active', [true, false]);

        if(error) throw error;
    }
}