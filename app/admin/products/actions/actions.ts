"use server";

import {NextResponse} from "next/server";
import {serverContainer} from "@/app/server-container";

export async function importStripeProducts() {
    const service = serverContainer.get('stripeProductIOService');
    const products = await service.importProductsFromStripe()
    return {
        products: products.length,
    }
}

export async function exportProductsToStripe() {
    const service = serverContainer.get('stripeProductIOService');
    const products = await service.exportProductsToStripe();
    return {products: products.length}
}