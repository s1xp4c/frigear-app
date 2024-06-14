"use server";

import {NextResponse} from "next/server";
import {apiContainer} from "@/app/api-container";

export async function importStripeProducts() {
    const service = apiContainer.get('stripeProductIOService');
    const products = await service.importProductsFromStripe()
    return NextResponse.json({products_imported: products.length})
}

export async function exportProductsToStripe() {
    const service = apiContainer.get('stripeProductIOService');
    const products = await service.exportProductsToStripe();
    return NextResponse.json({products_exported: products.length})
}