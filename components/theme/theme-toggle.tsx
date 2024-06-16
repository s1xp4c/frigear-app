"use client";

import * as React from "react";
import { FaMoon, FaSun, FaAdjust } from "react-icons/fa";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" size="icon">
            <FaSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <FaMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <FaAdjust className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all system:rotate-0 system:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <div className="toggle-mode">
              <div className="">Light</div>
              <FaSun className="h-[1.1rem] w-[1.1rem]" />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <div className="toggle-mode">
              <span>Dark</span>
              <FaMoon className=" h-[1rem] w-[1rem] " />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <div className="toggle-mode">
              <span>System</span>
              <FaAdjust className=" h-[1rem] w-[1rem] " />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
