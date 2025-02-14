"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { FaHeadset, FaUserShield, FaFileContract } from "react-icons/fa";

export function SettingsNav() {
  return (
    <>
      <div className="z-10 text-md mt-5 w-full">
        <ul className="grid gap-3 p-0 w-full h-full grid-cols-[1fr_5fr]  grid-rows-[1fr_1fr] bg-none">
          <div
            className={cn(
              "row-span-3 grid-span-2 h-full w-full select-none justify-start rounded-lg bg-gradient-to-b from-muted/5 to-muted p-3 no-underline outline-none focus:shadow-md",
            )}
          >
            <div className="-ml-1 flex row-span-2 mt-0 text-sm font-medium justify-between ">
              <div className="-mt-2 -ml-1">
                <ThemeToggle />
              </div>
              <ListItem className="mb-1" title="Farvetema">
                <p className="text-[.4rem] leading-tight -mt-2.5 text-muted-foreground text-right">
                  <span>Klik icon for temaændring</span>
                </p>
              </ListItem>
            </div>

            <ListItem className="mt-5 row-span-1" title="ZzzZzzz">
              <p className=" mt-auto line-clamp-5 ">
                <span>
                  Til højre finder du de mere kedelige settings af slagsen, men
                  de skal vel ås ha' lov at lege med.
                </span>
              </p>
            </ListItem>
          </div>
          <div className={cn("row-span-3  grid-span-3 bg-none ")}>
            <div className="mr-4 border-t-1.5 border-r-2 rounded-lg p-1 w-full h-full">
              <div className="-ml-1  block row-span-2 mt-0 text-sm font-medium ">
                <div className="-ml-1 flex items-center w-full justify-between ">
                  <FaUserShield className="absolute h-[1.3rem] w-[1.3rem] -mt-7 ml-3.5" />
                  <ListItem
                    className="mb-1 mt-2 mr-2 text-right w-full"
                    href="security/"
                    title="Sikkerhed"
                  >
                    <p className="text-left mt-1.5 ml-2.5 w-full">
                      <span>
                        Her kan du finde oplysninger om håndtering af dine info
                        og ændre cookie indstillinger.
                      </span>
                    </p>
                  </ListItem>
                </div>
              </div>
              <div className="-ml-1  block row-span-2 mt-0 text-sm font-medium ">
                <div className="-ml-1 flex items-center w-full justify-between ">
                  <FaFileContract className="absolute h-[1.3rem] w-[1.3rem] -mt-7 ml-3.5" />
                  <ListItem
                    className="mb-1 mt-2 mr-2 text-right w-full"
                    href="terms/"
                    title="Det tørre info"
                  >
                    <p className="text-left mt-1.5 ml-2.5 w-full">
                      <span>
                        Her finder du ting som GDPR regler og alt det andet
                        tørre vi desværre ikke kommer udenom.
                      </span>
                    </p>
                  </ListItem>
                </div>
              </div>
              <div className="-ml-1  block row-span-2 mt-0 text-sm font-medium ">
                <div className="-ml-1 flex items-center w-full justify-between ">
                  <FaHeadset className="absolute h-[1.3rem] w-[1.3rem] -mt-7 ml-3.5" />
                  <ListItem
                    className="mb-1 mt-2 mr-2 text-right w-full"
                    href="support/"
                    title="Support"
                  >
                    <p className="text-left mt-1.5 ml-2.5 w-full">
                      <span>
                        Support forum, FAQ, kontakt support og meget mere
                        omkring eventuelle fejl med appen.
                      </span>
                    </p>
                  </ListItem>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
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
          className,
        )}
        {...props}
      >
        <div className="text-[.75rem]  font-small leading-none">{title}</div>

        <p className="line-clamp-2 text-[.5rem]  font-small leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </li>
  );
});
ListItem.displayName = "ListItem";
