import { type NextRequest, NextResponse } from 'next/server';
import { Middleware } from '@/lib/middleware/types';
import { useServerSupabaseUserCurrentJwt } from '@/utils/supabase/server';
import { baseUrl } from '@/utils/helpers';

export const IsAdminMiddleware: Middleware = async (
  request: NextRequest,
  response,
) => {
  response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const { profile } = await useServerSupabaseUserCurrentJwt();

  if (!profile) {
    return NextResponse.redirect(baseUrl('/auth/signin'));
  }

  if (profile.role !== 'admin') {
    return NextResponse.redirect(baseUrl('/auth/login?error=missing_role'));
  }

  return response;
};
export default IsAdminMiddleware;
