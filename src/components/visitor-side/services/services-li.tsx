"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ServicesLi({
  imageLink,
  text,
}: {
  imageLink: string;
  text: string;
}) {
  return (
    <motion.li
      className="flex flex-col md:flex-row items-center md:odd:flex-row-reverse md:text-left md:odd:text-right mb-8 md:mb-0 text-center"
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "backInOut" }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <Image
        src={imageLink}
        width={150}
        height={150}
        alt="Проект"
        className="min-w-[150px] min-h-[150px] shadow-[0_3px_8px_rgba(0,0,0,0.24)] mb-2 md:mb-0"
      />
      <p className="px-6 tracking-widest font-thin">{text}</p>
    </motion.li>
  );
}
