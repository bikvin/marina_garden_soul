"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About({
  description_header,
  description,
}: {
  description_header: string;
  description: string;
}) {
  return (
    <section
      id="about"
      className="py-20 px-8 md:px-10  overflow-x-hidden max-w-screen-lg mx-auto"
    >
      <motion.div
        className="flex flex-col md:flex-row justify-around items-center"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "backInOut" }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <Image
          className="rounded-full h-[200px] w-[200px] mb-6"
          src="/img/avatar.jpg"
          width="200"
          height="200"
          alt=""
        />
        <div className="p-0 md:p-14 flex flex-col justify-center">
          <h4 className="uppercase pb-4">{description_header}</h4>
          <p className="font-thin tracking-widest">{description}</p>
        </div>
      </motion.div>
    </section>
  );
}

// Мои услуги:
// Разработка ландшафтного проекта с учетом ваших пожеланий и особенностей участка
// Озеленение и подбор растений с учетом климата и условий
// Устройство водоемов, прудов, ручьев
// Создание освещения и дорожек для уюта и безопасности
// Интеграция современных технологий (автополив, дренаж)
// Каждый проект — это тщательно продуманное сочетание эстетики, экологии и удобства, созданное для того, чтобы вы наслаждались своим садом круглый год. Независимо от размера или сложности участка, я помогу вам реализовать мечту о живописном и функциональном саде.
