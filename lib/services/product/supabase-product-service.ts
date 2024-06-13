import type {SupabaseClient} from "@supabase/supabase-js";
import type {Product, ProductService} from "@/lib/services/product/product-service";

export default class SupabaseProductService implements ProductService {
    private select = '*';

    constructor(
        private client: SupabaseClient
    ) {
    }

    async all() {
        const {data, error} = await this.client
            .from('product')
            .select<typeof this.select, Product>(this.select);
        if (!data) throw new Error('Not found.');
        if (error) throw error;

        return data
    }

    async getById(id: string): Promise<Product> {
        const {data, error} = await this.client
            .from('product')
            .select<typeof this.select, Product>(this.select)
            .eq('id', id)
            .maybeSingle();

        if (!data) throw new Error('Not found.');
        if (error) throw error;

        return data;
    }

    async getBySlug(slug: string): Promise<Product> {
        const {data, error} = await this.client
            .from('product')
            .select<typeof this.select, Product>(this.select)
            .eq('slug', slug)
            .maybeSingle();

        if (!data) throw new Error('Not found.');
        if (error) throw error;

        return data;
    }

    async create(attributes: Partial<Omit<Product, "id">>): Promise<Product> {
        const {data, error} = await this.client
            .from('product')
            .insert(attributes)
            .select<typeof this.select, Product>(this.select)
            .maybeSingle();

        if (!data) throw new Error('Not found.');
        if (error) throw error;

        return data;
    }

    async updateById(id: string, attributes: Partial<Product>): Promise<Product> {
        const {data, error} = await this.client
            .from('product')
            .update(attributes)
            .eq('id', id)
            .select<typeof this.select, Product>(this.select)
            .maybeSingle();

        if (!data) throw new Error('Not found.');
        if (error) throw error;

        return data;
    }

    async deleteById(id: string): Promise<void> {
        const {error} = await this.client
            .from('product')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
}