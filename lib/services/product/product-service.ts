import type {
  CreateProduct,
  Product,
  UpdateProduct,
} from '@/lib/repositories/product';
import type Stripe from 'stripe';
import { IPriceRepository } from '@/lib/repositories/product/stripe-price-repository';
import { IProductRepository } from '@/lib/repositories/product/supabase-product-repository';

export interface IProductService {
  all(): Promise<Product[]>;

  getById(id: string): Promise<Product | undefined>;

  getBySlug(slug: string): Promise<Product | undefined>;

  getByStripeId(id: string): Promise<Product | undefined>;

  create(product: CreateProduct): Promise<Product>;

  updateById(id: string, attributes: UpdateProduct): Promise<Product>;

  deleteById(id: string): Promise<void>;

  deleteAll(): Promise<void>;
}

export type ProductPrice = Stripe.Price;

const wrapTryCatch = async <R extends any>(
  callback: () => Promise<R>,
): Promise<R | undefined> => {
  try {
    return await callback();
  } catch (err: any) {
    if (err.name === 'NotFoundError') {
      return undefined;
    }

    throw err;
  }
};

export default class ProductService implements IProductService {
  constructor(
    private productRepository: IProductRepository,
    private priceRepository: IPriceRepository,
  ) {}

  async deleteAll(): Promise<void> {
    await this.productRepository.deleteAll();
  }

  async all(): Promise<Product[]> {
    return await this.productRepository.all();
  }

  async getById(id: string): Promise<Product | undefined> {
    return wrapTryCatch(async () => this.productRepository.getById(id));
  }

  async getBySlug(slug: string): Promise<Product | undefined> {
    return wrapTryCatch(async () => this.productRepository.getBySlug(slug));
  }

  async getByStripeId(id: string): Promise<Product | undefined> {
    return wrapTryCatch(async () =>
      this.productRepository.getBySecondaryId(id),
    );
  }

  async create(attributes: CreateProduct): Promise<Product> {
    if (attributes.default_stripe_price_id) {
      const price = await this.priceRepository.getById(
        attributes.default_stripe_price_id,
      );
      if (price.unit_amount) {
        attributes.price = price.unit_amount / 100;
      }
    }

    return (await wrapTryCatch(
      async () => await this.productRepository.create(attributes),
    )) as Product;
  }

  async updateById(id: string, attributes: UpdateProduct): Promise<Product> {
    const product = await this.productRepository.getById(id);

    if (
      attributes.default_stripe_price_id &&
      product.default_stripe_price_id !== attributes.default_stripe_price_id
    ) {
      const price = await this.priceRepository.getById(
        attributes.default_stripe_price_id,
      );
      if (price.unit_amount) {
        attributes.price = price.unit_amount / 100;
      }
    }

    return await this.productRepository.updateById(id, attributes);
  }

  async deleteById(id: string): Promise<void> {
    await this.productRepository.deleteById(id);
  }
}
