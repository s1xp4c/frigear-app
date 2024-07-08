'use client';

import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { ThemeToggle } from '@/components/theme/theme-toggle';

import { AdminMenu, ProductGroups } from '@/constants/navigation';
import LogoFull from '@/components/logos/logo-full/logo-full';
import { Button } from '@/components/ui/button';
import LogoFGR from '@/components/logos/logo-fgr/logo-fgr';
import { createSupabaseBrowserClient, useSupabaseBrowserUser } from '@/utils/supabase/client';
import { SessionContext } from '@/lib/providers/session-provider';
import type { User } from '@supabase/supabase-js';

export function DesktopNav() {
  const [user, setUser] = useState<User|undefined>()
  useEffect(()=>{
    //TODO: Check if this hook rule is needed?
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSupabaseBrowserUser().then(user => setUser(user))
  }, [user]);
  const isAdmin = true;
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>About</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-4">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <LogoFGR />
                    <div className="mb-4 mt-4 text-lg font-medium">
                      Frigear
                      <h3 className="text-xs leading-tight text-muted-foreground">
                        Frivillig forening
                      </h3>
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Nørrebro
                    </p>
                    <p className="text-sm leading-tight text-muted-foreground">
                      2200 Copenhagen N
                    </p>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Denmark
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem title="Volunteering">
                <Link href="/volunteering">Volunteering with Frigear</Link>
              </ListItem>
              <ListItem title="Support">
                <Link href="/support">General Web and shop Support</Link>
              </ListItem>
              <ListItem title="Projects">
                <Link href="/projects">Internal and external projects</Link>
              </ListItem>
              <ListItem title="Branding">
                <Link href="/pr/">PR and Branding guides</Link>
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {ProductGroups.map((groupLink) => (
                <Link key={groupLink.title} href={groupLink.href}>
                  <ListItem title={groupLink.title}>
                    {groupLink.description}
                  </ListItem>
                </Link>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {isAdmin && <NavigationMenuItem>
          <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {AdminMenu.map((adminLink) => (
                <Link key={adminLink.title} href={adminLink.href}>
                  <ListItem title={adminLink.title}>
                    {adminLink.description && <span>{adminLink.description}</span>}
                  </ListItem>
                </Link>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

const NavBar = () => {
  const session = useContext(SessionContext);
  const client = createSupabaseBrowserClient();
  return (
    <div className="nav-bar left-1/2 -translate-x-1/2 w-full">
      <div className="flex gap-4 w-28">
        <LogoFull /> {/* TODO: Add link to / on logo. */}
        <DesktopNav />
      </div>
      <div className="flex gap-4">
        <ThemeToggle />
        <Button variant="default" size="lg">
          {!session?.user && <Link href="/auth/signin">Sign In</Link>}
          {session?.user && (
            <Link
              href="#"
              onClick={async () => {
                await client.auth.signOut();
                location.replace('/');
              }}
            >
              Sign Out
            </Link>
          )}
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
