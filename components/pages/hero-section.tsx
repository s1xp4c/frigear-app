"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import Logo_rf_bgr from "@/components/logos/logo-fgr-hero/logo-fgr-hero";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className=" sm:mx-2 sm:absolute sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2">
      <div className="grid sm:gap-4 grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-7 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="collapse sm:visible text-foreground mb-4 text-3xl sm:text-4xl lg:text-5xl lg:leading-normal font-extrabold">
            <span className="">Frigear</span>
          </h1>
          <h2 className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-cyan-500 mb-8 sm:mb-4 text-3xl sm:text-4xl lg:text-6xl lg:leading-normal font-extrabold">
            <TypeAnimation
              sequence={[
                "Nonprofit",
                2000,
                "Frivilligdrevet",
                2000,
                "Forening og fond",
                2000,
                "Projektorienteret",
                2000,
                "Skal du være med?",
                2000,
                "Bliv medlem!",
                2000,
                "Bliv frivillig!",
                2000,
              ]}
              wrapper="span"
              speed={30}
              repeat={Infinity}
            />
          </h2>
          <p className="text-foreground/muted text-base sm:text-md mb-8 lg:text-lg">
            Foreningen Frigear støtter og faciliterer nonprofit
            frivilligprojekter i Danmark.
          </p>
          <div className="">
            <Button variant="primary" size="lg" className="md:mr-4 mb-4">
              <Link href="/contact">Kontakt os</Link>
            </Button>
            <Button variant="secondary" size="lg" className="mb-4">
              <Link href="/membership">Bliv medlem</Link>
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center items-center m-4 sm:m-8 lg:m-0"
        >
          <div className="mt-4 sm:mt-0 rounded-full bg-gradient-to-br from-primary via-cyan-500 to-transparent  w-[222px] h-[222px] sm:w-[250px] sm:h-[250px] lg:w-[320px] lg:h-[320px] relative">
            <Logo_rf_bgr className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full w-[215px] h-[215px] lg:w-[315px] lg:h-[315px] sm:w-[245px] sm:h-[245px]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
