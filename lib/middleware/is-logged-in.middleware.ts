import { type NextRequest, NextResponse } from 'next/server';
import { Middleware } from '@/lib/middleware/types';
import { url } from '@/utils/helpers';
import { createSupabaseMiddlewareClient } from '@/utils/supabase/middleware';

export const IsLoggedInMiddleware: Middleware = async (
  request: NextRequest,
  response,
) => {
  response = NextResponse.next({
    request,
  });

  const client = createSupabaseMiddlewareClient(request, response);

  const { data } = await client.auth.getUser();

  if (!data.user) {
    console.debug('User not logged in.');
    return NextResponse.redirect(url('/auth/signin?error=unauthenticated'));
  }

  console.debug(`User is logged in: ${data.user.email}`);
  return response;
};
export default IsLoggedInMiddleware;
