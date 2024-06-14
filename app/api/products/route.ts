import {NextRequest, NextResponse} from "next/server";
import {serverContainer} from "@/app/server-container";

export async function GET() {
    return NextResponse.json(await serverContainer.get('productService').all());
}

export async function POST(request: NextRequest) {
    return NextResponse.json(await serverContainer.get('productService').create(await request.json()))
}