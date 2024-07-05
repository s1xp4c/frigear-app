import type StripeProductService from "@/lib/services/product/stripe-product-service";
import {IProductService} from "@/lib/services/product/product-service";
import {transformStripeProduct} from "@/utils/stripe/helpers";
import type Stripe from "stripe";
import type {Product} from "@/lib/repositories/product";
import {upperFirst} from "scule";
import {v4 as uuidv4} from "uuid";

const transformInternalProductToStripe = (
  product: Product,
): Stripe.ProductCreateParams => {
  const { name, description, active, price, features, meta, currency_code } =
    product;

  return {
    name,
    description,
    active,
    metadata: meta,
    //Might not be working expected with features.
    marketing_features: features
      ? Object.keys(features).map((feature) => ({
          name: upperFirst(String(feature).replaceAll("_", " ")),
        }))
      : undefined,
    default_price_data: price
      ? {
          currency: currency_code,
          unit_amount: price * 100,
        }
      : undefined,
  };
};
export default class StripeProductIOService {
  constructor(
    private productService: IProductService,
    private stripeProductService: StripeProductService,
  ) {}

  async importProductsFromStripe(limit?: number): Promise<Product[]> {
    const products = await this.stripeProductService.all(limit);
    return await Promise.all(
      products.map(async (stripeProduct) => {
        const attributes = transformStripeProduct({ object: stripeProduct });
        attributes.slug = uuidv4();
        if (stripeProduct && stripeProduct.id) {
          const existing = await this.productService.getByStripeId(
            stripeProduct.id,
          );
          if (!existing) {
            return await this.productService.create(attributes);
          }
          return await this.productService.updateById(existing.id, attributes);
        }

        throw new Error("No strip ID defined.");
      }),
    );
  }

  async exportProductsToStripe(limit?: number): Promise<Stripe.Product[]> {
    const products = await this.productService.all();
    return await Promise.all(
      products.slice(0, limit).map(async (product) => {
        return await this.stripeProductService.create(
          transformInternalProductToStripe(product),
        );
      }),
    );
  }
}
