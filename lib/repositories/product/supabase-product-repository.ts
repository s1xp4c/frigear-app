import type { SupabaseClient } from '@supabase/supabase-js';
import {
  CreateProduct,
  Product,
  UpdateProduct,
} from '@/lib/repositories/product/index';
import { translateSupabaseError } from '@/utils/supabase/middleware';
import { NotFoundError } from '@/lib/errors';
import type { IRepository } from '@/lib/types';
import SupabaseRepository from '@/lib/repositories/supabase-repository';

export interface IProductRepository
  extends IRepository<string, Product, CreateProduct, UpdateProduct> {
  getBySlug(slug: string): Promise<Product>;

  getBySecondaryId(secondaryId: string): Promise<Product>;
}

export default class SupabaseProductRepository
  extends SupabaseRepository<Product, CreateProduct, UpdateProduct>
  implements IProductRepository
{
  constructor(protected client: SupabaseClient) {
    super('product', 'id', '*', client);
  }

  async getBySlug(slug: string): Promise<Product> {
    const { data, error } = await this.client
      .from('product')
      .select<typeof this.select, Product>(this.select)
      .eq('slug', slug)
      .maybeSingle();

    await translateSupabaseError(error);
    if (!data) throw new NotFoundError();

    return data as Product;
  }

  async getBySecondaryId(stripeId: string): Promise<Product> {
    const { data, error } = await this.client
      .from('product')
      .select<typeof this.select, Product>(this.select)
      .eq('stripe_id', stripeId)
      .maybeSingle();

    await translateSupabaseError(error);
    if (!data) throw new NotFoundError();

    return data as Product;
  }
}
