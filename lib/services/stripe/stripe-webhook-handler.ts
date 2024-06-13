import {NextResponse} from "next/server";

export interface StripeWebhookEventData {
    object: Record<string, any>;
}

export interface StripeWebhookEvent {
    type: string;
    object: 'event' | string;
    data: StripeWebhookEventData
}

export interface IStripeWebhookHandler {
    handleEvent(event: StripeWebhookEvent): Promise<NextResponse>;
}

//TODO: Set up basic stripe.
export default class StripeWebhookHandler implements IStripeWebhookHandler {
    async handleEvent({type, object, data}: StripeWebhookEvent): Promise<NextResponse> {
        switch (type) {
            case 'payment_intent.created':
                return this.paymentIntentCreated(data);
            case 'payment_intent.succeeded':
                return this.paymentIntentSucceeded(data);
            default:
                throw new Error('Unhandled event.');
        }
    }

    async paymentIntentCreated(data: StripeWebhookEventData): Promise<any> {
        return data;
    }

    async paymentIntentSucceeded(data: StripeWebhookEventData): Promise<any> {
        return data
    }
}