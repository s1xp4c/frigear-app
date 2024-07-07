import { type NextRequest, NextResponse } from 'next/server';
import { Middleware } from '@/lib/middleware/types';
import { url } from '@/utils/helpers';
import { createSupabaseMiddlewareClient } from '@/utils/supabase/middleware';

export const IsLoggedInMiddleware: Middleware = async (
  request: NextRequest,
  response,
) => {
  response = NextResponse.next({
    headers: request.headers,
  });

  const client = createSupabaseMiddlewareClient(request, response);

  try {
    const { data } = await client.auth.getUser();

    if (!data.user) {
      return NextResponse.redirect(url('/auth/signin?error=unauthenticated'));
    }

    return response;
  } catch (err: any) {
    return NextResponse.redirect(url('/auth/signin?error=unauthenticated'));
  }
};
export default IsLoggedInMiddleware;
