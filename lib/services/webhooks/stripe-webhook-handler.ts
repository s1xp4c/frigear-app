import { NextResponse } from "next/server";
import { IProductService } from "@/lib/services/product/product-service";
import type Stripe from "stripe";
import { NotFoundError } from "@/lib/errors";
import { transformStripeProduct } from "@/utils/stripe/helpers";

export interface StripeWebhookEventData {
  object: Record<string, any>;
}

export interface StripeWebhookEvent {
  type: string;
  object: "event";
  data: StripeWebhookEventData;
}

export interface IStripeWebhookHandler {
  handleEvent(event: StripeWebhookEvent): Promise<NextResponse>;
}

export default class StripeWebhookHandler implements IStripeWebhookHandler {
  constructor(private productService: IProductService) {}

  async handleEvent({ type, data }: StripeWebhookEvent): Promise<NextResponse> {
    //Ensures we do not allow filling from test keys.
    if (
      process.env.STRIPE_PRODUCT_SYNC_LIVEMODE &&
      data.object.livemode === false
    ) {
      return new NextResponse("", {
        status: 422,
      });
    }

    // Available events: https://docs.stripe.com/api/events/types
    switch (type) {
      case "product.created":
        return this.createProduct(data);
      case "product.updated":
        return this.updateProduct(data);
      case "product.deleted":
        return this.deleteProduct(data);
      case "price.updated":
        return this.updatePrice(data);
      case "price.created":
      case "payment_intent.created":
      case "payment_intent.succeeded":
      case "payment_intent.cancelled":
        throw new Error(`Not implemented event: ${type}`);
      default:
        throw new Error(`Unhandled event: ${type}`);
    }
  }

  async createProduct(data: StripeWebhookEventData): Promise<any> {
    const createProduct = transformStripeProduct(data);
    await this.productService.create(createProduct);

    return NextResponse.json({});
  }

  async updateProduct(data: StripeWebhookEventData): Promise<any> {
    const { id } = data.object as Stripe.Product;
    const product = await this.productService.getByStripeId(id);

    //Doesn't exist internally.
    if (!product) return this.createProduct(data);

    const updates = transformStripeProduct(data);
    await this.productService.updateById(product.id, updates);

    return NextResponse.json({});
  }

  async deleteProduct(data: StripeWebhookEventData): Promise<any> {
    const { id } = data.object as Stripe.Product;
    const product = await this.productService.getByStripeId(id);

    if (!product) return NextResponse.json({});

    //Kinda soft deleting
    await this.productService.updateById(product.id, {
      active: false,
    });

    return NextResponse.json({});
  }

  async updatePrice(data: StripeWebhookEventData) {
    const { id, unit_amount, currency, product } = data.object as Stripe.Price;
    if (!unit_amount) return NextResponse.json({});

    const stripeProductId = typeof product === "string" ? product : product.id;
    const productForUpdate =
      await this.productService.getByStripeId(stripeProductId);

    if (!productForUpdate) throw new NotFoundError();

    await this.productService.updateById(productForUpdate.id, {
      price: unit_amount / 100, //in case it is the same price id.
      default_price_id: id,
      currency_code: String(currency).toUpperCase(),
    });
    return NextResponse.json({});
  }
}
