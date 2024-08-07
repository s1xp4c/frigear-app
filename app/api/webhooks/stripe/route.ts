import { NextRequest, NextResponse } from 'next/server';
import { serverContainer } from '@/app/server-container';

export async function POST(request: NextRequest) {
  return NextResponse.json(
    await serverContainer
      .make('stripeWebhookHandler')
      .handleEvent(await request.json()),
  );
}
