import type Stripe from "stripe";
import type {IRepository} from "@/lib/types";

export default class StripePriceRepository implements IRepository<string, Stripe.Price, Stripe.PriceCreateParams, Stripe.PriceUpdateParams> {
    constructor(private stripe: Stripe) {
    }

    async all(): Promise<Stripe.Price[]> {
        const {data} = await this.stripe.prices.list({active: true});
        return data;
    }

    async getById(id: string): Promise<Stripe.Price> {
        return await this.stripe.prices.retrieve(id);
    }

    getBySlug(slug: string): Promise<Stripe.Price> {
        return this.getById(slug);
    }

    getBySecondaryId(secondaryId: string): Promise<Stripe.Price> {
        return this.getById(secondaryId);
    }

    create(attributes: Stripe.PriceCreateParams): Promise<Stripe.Price> {
        return this.stripe.prices.create(attributes);
    }

    updateById(id: string, attributes: Stripe.PriceUpdateParams): Promise<Stripe.Price> {
        return this.stripe.prices.update(id, attributes);
    }

    async deleteById(id: string): Promise<void> {
        await this.stripe.prices.update(id, {active: false});
    }

    async deleteAll(): Promise<void> {
        const prices = await this.all();
        await Promise.all(prices.map(async (price) => {
            await this.deleteById(price.id);
        }))
    }
}