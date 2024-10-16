import type { NextRequest, NextResponse } from 'next/server';

export type Middleware<
  Request extends NextRequest = NextRequest,
  Response extends NextResponse = NextResponse,
> = (request: Request, response: Response) => Promise<Response>;

export type MiddlewareStack = Middleware[];

export type ScopedMiddlewareStack = {
  [key: string]: MiddlewareStack;
};
