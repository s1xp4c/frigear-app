import {NextRequest, NextResponse} from "next/server";
import {apiContainer} from "@/app/api/api-container";

export async function GET(request: NextRequest) {
    return NextResponse.json(await apiContainer.get('productService').all());
}

export async function POST(request: NextRequest) {
    return NextResponse.json(await apiContainer.get('productService').create(await request.json()))
}