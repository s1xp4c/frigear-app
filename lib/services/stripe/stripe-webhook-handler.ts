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
        let result: Record<string, any> = {};
        switch (type) {
            case 'payment_intent.created':
                result = this.paymentIntentCreated(data);
                break;
            case 'payment_intent.succeeded':
                result = this.paymentIntentSucceeded(data);
                break;
            default:
                throw new Error('Unhandled event.');
        }

        return NextResponse.json({result, object})
    }

    async paymentIntentCreated(data: StripeWebhookEventData): Promise<any> {
        return data;
    }

    async paymentIntentSucceeded(data: StripeWebhookEventData): Promise<any> {
        return data
    }
}