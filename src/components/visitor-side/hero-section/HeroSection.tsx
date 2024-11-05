"use client";
import React from "react";
import Parallax from "../parallax";
import { motion } from "framer-motion";

export default function HeroSection({ main_header }: { main_header: string }) {
  return (
    <Parallax imageLink="/img/bg/garden-1.jpg" height={600}>
      <div className="text-white text-3xl md:text-4xl tracking-[.25em] md:tracking-[.4em] font-bold uppercase w-full text-center overflow-hidden leading-relaxed">
        <motion.h1
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
        >
          {main_header}
        </motion.h1>
      </div>
    </Parallax>
  );
}
