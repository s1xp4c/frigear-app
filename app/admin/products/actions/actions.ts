"use server";

import {serverContainer} from "@/app/server-container";

export async function importStripeProducts() {
  const service = serverContainer.make("stripeProductIOService");
  const products = await service.importProductsFromStripe();
  return {
    products: products.length,
  };
}

export async function exportProductsToStripe() {
  const service = serverContainer.make("stripeProductIOService");
  const products = await service.exportProductsToStripe();
  return { products: products.length };
}
