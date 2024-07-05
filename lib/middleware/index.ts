import { NextRequest, NextResponse } from 'next/server';
import { MiddlewareStack, ScopedMiddlewareStack } from './types';

export async function runMiddlewareScopes(
  request: NextRequest,
  scopes: ScopedMiddlewareStack,
): Promise<NextResponse | null> {
  const { pathname } = new URL(request.url);
  const matchingMiddlewareStacks: MiddlewareStack[] = [];

  // Match the request path with middleware scopes
  for (const scope in scopes) {
    const regex = new RegExp(scope, 'ig');
    if (regex.test(pathname)) {
      matchingMiddlewareStacks.push(scopes[scope]);
    }
  }

  if (matchingMiddlewareStacks.length === 0) {
    return null;
  }

  let response: NextResponse = NextResponse.next();
  for (const stack of matchingMiddlewareStacks) {
    for (const middleware of stack) {
      response = await middleware(request, response);
      if (!response.ok || response.redirected) {
        return response;
      }
    }
  }
  return response;
}

export async function runMiddlewareStack(
  request: NextRequest,
  response: NextResponse,
  stack: MiddlewareStack,
) {
  // Execute the middleware stack
  for (const middleware of stack) {
    response = await middleware(request, response);
    if (!response.ok) {
      return response;
    }
  }
  return response;
}
