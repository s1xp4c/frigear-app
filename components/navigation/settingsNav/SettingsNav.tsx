"use client";

import * as React from "react";
import { cn } from ":/lib/utils";
import { ThemeToggle } from ":/components/themeToggle/ThemeToggle";

export function SettingsNav() {
  return (
    <>
      <nav className="z-10 text-md mt-4">
        <ul className="grid gap-3 p-0 w-[92vw] grid-cols-[.70fr_1fr] bg-none">
          <div className={cn("row-span-3 bg-none")}>
            <div className="flex h-[85%] w-full select-none flex-col justify-start rounded-lg bg-gradient-to-b from-muted/20 to-muted p-2 no-underline outline-none focus:shadow-md">
              <div className="flex mb-0 mt-0 text-md font-medium ml-[0.1rem]">
                <ThemeToggle />
                <p className="-mt-[.15rem] -ml-[.2rem]">{"Farvetema"}</p>
              </div>
              <p className="text-[.7rem] leading-tight text-muted-foreground">
                {"Klik på ikonet for at ændre tema."}
                <br></br>
                <br></br>
                <br></br>
                {
                  "Til højre finder du de mere kedelige settings af slagsen, men de skal jo ås ha' lov at lege med."
                }
              </p>
            </div>
          </div>
          <div className="mr-4 mt-0 border-t-2 border-r-2 rounded-lg p-2 h-full">
            <ListItem className="mb-1" href="security/" title="Sikkerhed">
              <p className="text-[.6rem]">
                {
                  "Her kan du finde oplysninger om håndtering af dine info og ændre cookie indstillinger."
                }
              </p>
            </ListItem>
            <ListItem className="mb-1" href="terms/" title="Det tørre info">
              <p className="text-[.6rem]">
                {
                  "Her finder du ting som GDPR regler og alt det andet tørre vi desværre ikke kommer udenom."
                }
              </p>
            </ListItem>
            <ListItem href="support/" title="Support">
              <p className="text-[.6rem]">
                {
                  "Support forum, FAQ, kontakt support og meget mere omkring eventuelle fejl med appen."
                }
              </p>
            </ListItem>
          </div>
        </ul>
      </nav>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-1 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-xs font-small leading-none">{title}</div>
        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </li>
  );
});
ListItem.displayName = "ListItem";
