import {buildStripePrice} from "@/tests/mock-data";
import MockRepository from "@/tests/mocks/mock-repository";
import type Stripe from "stripe";

export default class MockStripePriceService extends MockRepository<Stripe.Price> {
    async getById(id: string) {
        return buildStripePrice({id} as never);
    }
}