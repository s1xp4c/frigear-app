import type Stripe from 'stripe';

import { IRepository } from '@/lib/types';

export interface IStripeProductService
  extends IRepository<
    string,
    Stripe.Product,
    Stripe.ProductCreateParams,
    Stripe.ProductUpdateParams
  > {}

export default class StripeProductService implements IStripeProductService {
  constructor(private stripe: Stripe) {}

  async all(limit: number = 300) {
    const { data } = await this.stripe.products.list({ limit });
    return data;
  }

  async getById(id: string) {
    return await this.stripe.products.retrieve(id);
  }

  async create(params: Stripe.ProductCreateParams) {
    return await this.stripe.products.create(params);
  }

  async updateById(
    id: string,
    attributes: Partial<Stripe.ProductUpdateParams>,
  ): Promise<Stripe.Product> {
    return await this.stripe.products.update(id, attributes);
  }

  async deleteAll(): Promise<void> {
    const allProducts = await this.all();
    await Promise.all(
      allProducts.map(async (product) => {
        await this.deleteById(product.id);
      }),
    );
  }

  async deleteById(id: string): Promise<void> {
    await this.stripe.products.del(id);
  }
}
