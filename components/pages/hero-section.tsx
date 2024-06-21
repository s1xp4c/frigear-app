"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import Logo_rf_bgr from "@/components/logos/logo-fgr-hero/logo-fgr-hero";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-foreground mb-4 text-3xl sm:text-4xl lg:text-6xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-cyan-500">
              Frigear
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                "Non-profit",
                2000,
                "Frivillig drevet",
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
          </h1>
          <p className="text-foreground/muted text-base sm:text-md mb-6 lg:text-lg">
            Foreningen Frigear støtter og faciliterer non-profit frivillig
            projekter i Danmark.
          </p>
          <div className="">
            <Button variant="primary" size="lg" className="mr-4">
              <Link href="/contact">Contact us</Link>
            </Button>
            <Button variant="secondary" size="lg">
              <Link href="/membership">Membership</Link>
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="rounded-full bg-gradient-to-br from-primary via-cyan-500 to-transparent  w-[220px] h-[220px] lg:w-[320px] lg:h-[320px] relative">
            <Logo_rf_bgr className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
