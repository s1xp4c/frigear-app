"use client";

import * as React from "react";
import { useContext } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/theme/theme-toggle";

import { ProductGroups } from "@/constants/navigation";
import LogoFull from "@/components/logos/logo-full/logo-full";
import { Button } from "@/components/ui/button";
import LogoFGR from "@/components/logos/logo-fgr/logo-fgr";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { SessionContext } from "@/lib/providers/session-provider";

export function DesktopNav() {
  return (
    <>
      <NavigationMenu className="h-26">
        <NavigationMenuList>
          <NavigationMenuItem className="mt-4 hover:bg-none ">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="inline-flex h-max w-max items-center justify-center mr-10">
                <LogoFull width={190} />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <span className="text-lg font-large ">Om os</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-4">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="items-center w-full justify-center mb-4 mr-2">
                        <LogoFGR />
                      </div>
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
                        2200 Kbh N
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
            <NavigationMenuTrigger>
              <span className="text-lg font-large ">Produkter</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {ProductGroups.map((products) => (
                  <ListItem key={products.title} title={products.title}>
                    <Link href={products.href}>{products.description}</Link>
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-md font-large leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const NavBar = () => {
  const session = useContext(SessionContext);
  const client = createSupabaseBrowserClient();
  return (
    <div className="absolute justify-between left-1/2 -translate-x-1/2 w-full z-10 max-w-7xl flex p-6 items-center">
      <div className="">
        <DesktopNav />
      </div>
      <div className="flex gap-4">
        <ThemeToggle />
        <Button variant="default" size="lg">
          {!session?.user && <Link href="/auth/signin">LOG IND</Link>}
          {session?.user && (
            <Link
              href="#"
              onClick={async () => {
                await client.auth.signOut();
                location.replace("/");
              }}
            >
              LOG UD
            </Link>
          )}
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
