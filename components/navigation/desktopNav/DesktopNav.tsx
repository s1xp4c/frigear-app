"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import tinyLogo from "@/app/FGR-SVG.svg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme/theme-toggle";

import navigationData from "@/constants/navigationTemplate.json";

export function DesktopNav() {
  return (
    <>
      <nav className="z-50 fixed top-0 sm:text-lg hidden sm:block">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{"Medlem"}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="memory/"
                      >
                        <Image
                          src={tinyLogo}
                          width={30}
                          height={30}
                          alt="Tiny Frigear Logo"
                        />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          {"Fællestival's musikere"}
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          {
                            "En lang række af frække kunstnere har besøgt Snævren gennem årene. Ta´ en tur ned ad memory lane her."
                          }
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="medlemskab/" title="Bliv medlem">
                    {"sdfljsndlfjn"}
                  </ListItem>
                  <ListItem href="projekter/" title="Projekter">
                    {"kjhsdfkjbdfs"}
                  </ListItem>
                  <ListItem href="info/" title="Om Frigear">
                    {"kjsdfkjdbskdf"}
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{"Components"}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {navigationData.components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {"Documentation"}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ThemeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      {/* )} */}
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
