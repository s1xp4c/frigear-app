"use client";
import { FaUserNinja } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LogoFull from "@/components/logos/logo-full/logo-full";
import { SettingsNav } from "@/components/navigation/settings-nav/SettingsNav";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { SessionContext } from "@/lib/providers/session-provider";

const MobileNav = () => {
  const client = createSupabaseBrowserClient();
  const session = useContext(SessionContext);
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) toggleOpen();
  }, [pathname, isOpen]);

  return (
    <div className="mobile-device-menu bg-background/80 mx-2 mt-2 ">
      <div className="bg-gradient-to-b to-muted/0 from-indigo-500/20  w-full border-b-[.1rem] border-x-[.1rem] rounded-lg border-indigo-700 mb-[.05rem]">
        <div className="grid grid-cols-5 justify-between py-2 items-center ">
          <Sheet>
            <div className="text-left ml-3 mt-1 col-span-1 ">
              <SheetTrigger>
                <IoSettings size={38} />
              </SheetTrigger>
            </div>
            <SheetContent side="left">
              <SheetTitle className="text-center mt-8">
                App Indstillingsgøgl
              </SheetTitle>
              <SettingsNav />
            </SheetContent>
          </Sheet>
          <div className="text-center col-span-3 mx-auto my-auto">
            <Link href={"/"} className="">
              <LogoFull width={130} height={30} />
            </Link>
          </div>

          <Sheet>
            <div className="text-right mt-1.5 mr-3 col-span-1">
              <SheetTrigger className="user-menu" onClick={toggleOpen}>
                <FaUserNinja size={37} />
              </SheetTrigger>
            </div>
            <SheetContent side="right">
              <SheetHeader className="mt-10">
                <SheetTitle>💜 Kom indenfor 💜</SheetTitle>
                <SheetDescription>
                  {!session?.user && <Link href="/auth/signin">Sign in</Link>}
                  <br />
                  {!session?.user && <Link href="/auth/signup">Sign up</Link>}
                  {session?.user && (
                    <Link
                      href="#"
                      onClick={async () => {
                        await client.auth.signOut();
                        location.replace("/");
                      }}
                    >
                      Sign out
                    </Link>
                  )}
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
