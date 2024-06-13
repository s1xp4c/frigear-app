import {NextRequest, NextResponse} from "next/server";
import {serverContainer} from "@/app/api/server-container";

export async function POST(request: NextRequest) {
    return serverContainer.get('stripeWebhookHandler').handleEvent(await request.json());
}
