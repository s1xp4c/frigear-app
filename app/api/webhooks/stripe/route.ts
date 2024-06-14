import {NextRequest, NextResponse} from "next/server";
import {apiContainer} from "@/app/api-container";

export async function POST(request: NextRequest) {
    return NextResponse.json(apiContainer.get('stripeWebhookHandler').handleEvent(await request.json()));
}
