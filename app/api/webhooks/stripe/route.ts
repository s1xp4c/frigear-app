import { NextRequest, NextResponse } from 'next/server';
import { serverContainer } from '@/constants/server-container';

export async function POST(request: NextRequest) {
  return NextResponse.json(
    await serverContainer
      .make('stripeWebhookHandler')
      .handleEvent(await request.json()),
  );
}
