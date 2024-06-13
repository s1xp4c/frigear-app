import {NextRequest, NextResponse} from "next/server";
import {serverContainer} from "@/app/api/server-container";

export async function POST(request: NextRequest) {
    const container = await serverContainer();
    return NextResponse.json(await container.get('stripeWebhookHandler').handleEvent(await request.json()))
}

export async function GET(request: NextRequest) {
    return new NextResponse('test');
}