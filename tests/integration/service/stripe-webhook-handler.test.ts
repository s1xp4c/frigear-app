import { beforeAll, describe, expect, it } from "vitest";
import StripeWebhookHandler, {
  IStripeWebhookHandler,
} from "@/lib/services/webhooks/stripe-webhook-handler";
import MockRepository from "@/tests/mocks/mock-repository";
import ProductService, {
  IProductService,
} from "@/lib/services/product/product-service";
import { buildStripeEvent, buildStripeProduct } from "@/tests/mock-data";
import type Stripe from "stripe";
import MockStripePriceService from "@/tests/mocks/mock-stripe-price-service";
import { IProductRepository } from "@/lib/repositories/product/supabase-product-repository";

describe("service#webhooks/stripe-webhook-handler", () => {
  let repository: IProductRepository;
  let service: IProductService;
  let handler: IStripeWebhookHandler;
  let stripeProduct: Stripe.Product;

  beforeAll(() => {
    stripeProduct = buildStripeProduct();
    repository = new MockRepository();
    service = new ProductService(repository, new MockStripePriceService());
    handler = new StripeWebhookHandler(service);
  });

  it("should throw on unhandled events", async () => {
    const eventName = "some.random.event";
    expect(
      async () =>
        await handler.handleEvent(buildStripeEvent(eventName, stripeProduct)),
    ).rejects.toThrow(`Unhandled event: ${eventName}`);
  });

  it("should create a new product", async () => {
    await handler.handleEvent(
      buildStripeEvent("product.created", stripeProduct),
    );

    const [product] = await service.all();
    expect(product.stripe_id).toBe(stripeProduct.id);
  });

  it("should update an existing product", async () => {
    const name = "A new name";
    await handler.handleEvent(
      buildStripeEvent("product.updated", { ...stripeProduct, name }),
    );
    const [product] = await service.all();
    expect(product.name).toBe(name);
  });

  it("should mark a product as inactive when deleted in stripe", async () => {
    const [preProduct] = await service.all();
    expect(preProduct.active).toBe(true);
    await handler.handleEvent(
      buildStripeEvent("product.deleted", stripeProduct),
    );

    const [product] = await service.all();
    expect(product.active).toBe(false);
  });

  it("should fetch product price", () => {});
});
