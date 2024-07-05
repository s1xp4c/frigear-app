import MockRepository from "@/tests/mocks/mock-repository";
import type Stripe from "stripe";
import { IPriceRepository } from "@/lib/repositories/product/stripe-price-repository";

export default class MockStripePriceService
  extends MockRepository<
    string,
    Stripe.Price,
    Stripe.PriceCreateParams,
    Stripe.PriceUpdateParams
  >
  implements IPriceRepository {}
