import type Stripe from "stripe";

export default class StripeProductService {
    constructor(
        private stripe: Stripe,
    ) {
    }

    async all(limit: number = 300) {
        const products = await this.stripe.products.list({limit})
        return products.data;
    }

    async getById(id: string) {
        const product = await this.stripe.products.retrieve(id);
        return product as Stripe.Product;
    }

    async create(params: Stripe.ProductCreateParams) {
        const product = await this.stripe.products.create(params);
        return product as Stripe.Product;
    }

    async update(id: string, params: Stripe.ProductUpdateParams) {
        const product = await this.stripe.products.update(id, params);
        return product as Stripe.Product;
    }

    async delete(id: string) {
        return await this.stripe.products.del(id) as Stripe.DeletedProduct;
    }
}