import { type NextRequest } from 'next/server';
import { UserSessionMiddleware } from '@/utils/supabase/middleware';
import { runMiddlewareScopes } from '@/lib/middleware';
import IsAdminMiddleware from '@/lib/middleware/is-admin.middleware';
import IsLoggedInMiddleware from '@/lib/middleware/is-logged-in.middleware';

export async function middleware(request: NextRequest) {
  return await runMiddlewareScopes(request, {
    '.*': [UserSessionMiddleware],
    '/admin.*': [IsLoggedInMiddleware, IsAdminMiddleware],
    '/app.*': [IsLoggedInMiddleware],
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
