import {buildStripePrice} from "@/tests/mock-data";
import StripePriceService from "@/lib/services/product/stripe-price-service";

export default class MockStripePriceService{
    async getPriceById(id: string) {
        return buildStripePrice({id} as never);
    }
}