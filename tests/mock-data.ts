import type Stripe from 'stripe';
import { StripeWebhookEvent } from '@/lib/services/webhooks/stripe-webhook-handler';
import type { NextRequest } from 'next/server';
import { RequestData } from 'next/dist/server/web/types';

export const email = 'test@example.com';

export const password = 'verysecure123password';

export const buildNextRequest = ({
  body,
}: {
  body: RequestData['body'] | object;
}): NextRequest => {
  return {
    // body: typeof body === 'string' ? Buffer.from(body) : JSON.stringify(body) as any,
    json: async () => body,
  } as NextRequest;
};

export const buildStripeProduct = (
  fields?: Partial<Stripe.ProductCreateParams> | undefined,
): Stripe.Product => {
  return {
    id: 'prod_NWjs8kKbJWmuuc',
    object: 'product',
    active: true,
    created: 1678833149,
    description: null,
    images: [],
    features: [],
    livemode: true,
    metadata: {},
    name: 'Gold Plan',
    package_dimensions: null,
    shippable: null,
    statement_descriptor: null,
    tax_code: null,
    unit_label: null,
    updated: 1678833149,
    url: null,
    ...fields,
  } as Stripe.Product;
};

export const buildStripePrice = (
  fields?: Partial<Stripe.PriceCreateParams> & {
    id?: string;
    currency?: string;
  },
): Stripe.Price => {
  return {
    id: 'price_1MoBy5LkdIwHu7ixZhnattbh',
    object: 'price',
    active: true,
    billing_scheme: 'per_unit',
    created: 1679431181,
    currency: 'dkk',
    livemode: false,
    lookup_key: null,
    nickname: null,
    product: 'prod_NZKdYqrwEYx6iK',
    recurring: {
      interval: 'month',
      interval_count: 1,
      trial_period_days: null,
      usage_type: 'licensed',
    } as never,
    custom_unit_amount: '',
    tax_behavior: 'unspecified',
    tiers_mode: null,
    transform_quantity: null,
    type: 'recurring',
    unit_amount: 1000,
    unit_amount_decimal: '1000',
    ...fields,
  } as Stripe.Price;
};

export const buildStripeEvent = (
  type: string,
  object: any,
): StripeWebhookEvent => {
  return {
    type,
    object: 'event',
    data: { object },
  };
};
