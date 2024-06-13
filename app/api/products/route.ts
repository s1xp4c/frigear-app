import {NextRequest, NextResponse} from "next/server";
import {serverContainer} from "@/app/api/server-container";

export async function GET(request: NextRequest) {
    return NextResponse.json(await serverContainer.get('productService').all());
}

export async function POST(request: NextRequest) {
    return NextResponse.json(await serverContainer.get('productService').create(await request.json()))
}

export async function PUT(request: NextRequest) {}