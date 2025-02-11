"use client";
import Image from "next/image";
import { IoChatbubblesSharp } from "react-icons/io5";
import { FaShoppingCart, FaInfo, FaGuitar } from "react-icons/fa";
import { FaHouseFlag } from "react-icons/fa6";
import Logo from "../icons/logo-purple";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

function FooterMobile() {
  const icons: { Icon: React.ElementType; href: string }[] = [
    { Icon: FaShoppingCart, href: "kurv/" },
    { Icon: FaInfo, href: "info/" },
    { Icon: IoChatbubblesSharp, href: "chat/" },
    { Icon: FaGuitar, href: "events/" },
    { Icon: FaHouseFlag, href: "butik/" },
  ];
  return (
    <motion.div
      className=" w-full flex items-center z-50 p-6 pb-1 shadow-md justify-between bottom-0 absolute mt-auto bg-gradient-to-b from-muted/0 to-background border-indigo-700 mb-[0.2rem]"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {icons.map(({ Icon, href }, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.2 }}
          className="bg-gradient-to-r from-background to-indigo-500 border-t-[.1rem] border-l-[.1rem] rounded-full border-indigo-700 relative"
        >
          {Icon === IoChatbubblesSharp ? (
            <>
              <Link href={href}>
                <IoChatbubblesSharp
                  size={34}
                  className={cn("transform relative -scale-x-100 m-3 ")}
                />
                <Logo
                  width={20}
                  className="z-10 ml-[-.2rem] -mt-[0.2rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              </Link>
            </>
          ) : (
            <Link href={href}>
              <Icon size={18} className={cn("m-2")} />
            </Link>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default FooterMobile;
