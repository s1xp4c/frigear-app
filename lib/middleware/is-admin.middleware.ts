import { type NextRequest, NextResponse } from 'next/server';
import { Middleware } from '@/lib/middleware/types';
import {
  createSupabaseMiddlewareClient,
  useSupabaseMiddlewareUser,
} from '@/utils/supabase/middleware';

export const IsAdminMiddleware: Middleware = async (
  request: NextRequest,
  response,
) => {
  response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const user = await useSupabaseMiddlewareUser(request, response);

  if (!user) {
    return response;
  }

  const client = createSupabaseMiddlewareClient(request, response);

  const {
    data: { session },
  } = await client.auth.getSession();

  if (!session) {
    return response;
  }

  return response;
};
export default IsAdminMiddleware;
