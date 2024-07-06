import { type NextRequest, NextResponse } from 'next/server';
import { Middleware } from '@/lib/middleware/types';
import { createSupabaseMiddlewareClient } from '@/utils/supabase/middleware';

export const IsAdminMiddleware: Middleware = async (
  request: NextRequest,
  response,
) => {
  response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const client = createSupabaseMiddlewareClient(request, response);
  try {
    const {
      data: { session },
    } = await client.auth.getSession();

    if (!session) {
      return response;
    }

    return response;
  } catch (err: any) {
    return response;
  }
};
export default IsAdminMiddleware;
