import type Stripe from "stripe";

export default class StripePriceService {
    constructor(private stripe: Stripe) {
    }

    async getPriceById(id: string) {
        const price =await this.stripe.prices.retrieve(id);
        return price;
    }
}