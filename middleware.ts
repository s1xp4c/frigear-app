import { type NextRequest } from 'next/server';
import { UserSessionMiddleware } from '@/utils/supabase/middleware';
import { MiddlewareStack, ScopedMiddlewareStack } from '@/lib/middleware/types';
import { runMiddlewareScopes } from '@/lib/middleware';
import IsLoggedInMiddleware from '@/lib/middleware/is-logged-in.middleware';
import IsAdminMiddleware from '@/lib/middleware/is-admin.middleware';

const globalMiddleware: MiddlewareStack = [UserSessionMiddleware];

const middlewareScopes: ScopedMiddlewareStack = {
  '.*': globalMiddleware,
  //Admin only middleware
  '/admin.*': [IsLoggedInMiddleware, IsAdminMiddleware],
};

export async function middleware(request: NextRequest) {
  return await runMiddlewareScopes(request, middlewareScopes);
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
