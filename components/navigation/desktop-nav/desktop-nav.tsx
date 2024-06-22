"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/theme/theme-toggle";

import NavProducts from "@/constants/navigation-products";
import LogoFull from "@/components/logos/logo-full/logo-full";
import { Button } from "@/components/ui/button";
import LogoFGR from "@/components/logos/logo-fgr/logo-fgr";

export function DesktopNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>About</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-4">
                <NavigationMenuLink asChild>
                  <a
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
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/volunteering" title="Volunteering">
                Volunteering with Frigear
              </ListItem>
              <ListItem href="/support" title="Support">
                General Web and shop Support
              </ListItem>
              <ListItem href="/projects" title="Projects">
                Internal and external projects
              </ListItem>
              <ListItem href="/pr/" title="Branding">
                PR and Branding guides
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {NavProducts.map((products) => (
                <ListItem
                  key={products.title}
                  title={products.title}
                  href={products.href}
                >
                  {products.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
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
ListItem.displayName = "ListItem";

const NavBar = () => {
  return (
    <div className=" w-full max-w-7xl mx-auto my-auto grid grid-flow-col justify-between py-4">
      <div className="flex gap-4 w-28">
        <LogoFull />
        <DesktopNav />
      </div>
      <div className="flex gap-4">
        <ThemeToggle />
        <Button variant="default" size="lg">
          <Link href="/auth/signin">LOGIN</Link>
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
