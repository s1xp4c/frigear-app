'use client';
import { FaUserNinja } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LogoFull from '@/components/logos/logo-full/logo-full';
import { SettingsNav } from '@/components/navigation/settings-nav/SettingsNav';
import { createSupabaseBrowserClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';

const MobileNav = () => {
  const client = createSupabaseBrowserClient();
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    client.auth.getUser().then(({ data }) => setUser(data.user || undefined));
  }, [client, user]);
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) toggleOpen();
  }, [pathname, isOpen]);

  return (
    <div className="mobile-device-menu bg-background/80 mx-2 mt-2 ">
      <div className="bg-gradient-to-b to-muted/0 from-indigo-500/20  w-full border-b-[.1rem] border-x-[.1rem] rounded-lg border-indigo-700 mb-[.05rem]">
        <div className="grid grid-cols-5 justify-between py-2">
          <Sheet>
            <div className="text-left ml-3 mt-1 col-span-1 ">
              <SheetTrigger>
                <IoSettings size={32} />
              </SheetTrigger>
            </div>
            <SheetContent side="right">
              <SheetTitle className="text-center mt-8">
                App Indstillingsgøgl
              </SheetTitle>
              <SettingsNav />
            </SheetContent>
          </Sheet>
          <div className="text-center col-span-3 mx-auto my-auto ">
            <Link href={'/'} className="">
              <LogoFull />
            </Link>
          </div>

          <Sheet>
            <div className="text-right mt-1 mr-3 col-span-1">
              <SheetTrigger className="user-menu" onClick={toggleOpen}>
                <FaUserNinja size={32} />
              </SheetTrigger>
            </div>
            <SheetContent>
              <SheetHeader className="mt-10">
                <SheetTitle>💜 Kom indenfor 💜</SheetTitle>
                <SheetDescription>
                  {!user && <Link href="/auth/signin">Sign in</Link>}
                  <br />
                  {!user && <Link href="/auth/signup">Sign up</Link>}
                  {user && (
                    <Link
                      href="#"
                      onClick={async () => {
                        await client.auth.signOut();
                        location.replace('/');
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
