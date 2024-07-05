import type Stripe from 'stripe';
import { kebabCase } from 'scule';
import moment from 'moment/moment';
import { Product } from '@/lib/repositories/product';
import { StripeWebhookEventData } from '@/lib/services/webhooks/stripe-webhook-handler';

export function transformStripeProduct(data: StripeWebhookEventData): Product {
  const {
    id,
    name = 'N/A',
    description,
    active,
    created,
    updated,
    default_price,
  } = data.object as Stripe.Product;

  return {
    name,
    stripe_id: id,
    slug: kebabCase(name).replaceAll(' ', '').concat(id),
    active,
    description: description || undefined,
    default_stripe_price_id:
      typeof default_price === 'string'
        ? default_price
        : default_price?.id || undefined,
    price:
      typeof default_price !== 'string' && default_price?.unit_amount
        ? default_price.unit_amount / 100
        : undefined,
    created_at: moment(created * 1000).toISOString(),
    updated_at: moment(updated * 1000).toISOString(),
  } as Product;
}
