import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="px-8 md:px-16 py-5 max-w-screen-lg mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="flex items-center justify-center uppercase font-cormorant text-lg tracking-[.25em] pb-4 md:pb-0">
          <Link href="/">
            <h4 className="text-center md:text-left">Марина Шестакова</h4>
          </Link>
        </div>
        <div className="flex justify-center pb-4 md:pb-0 order-first md:order-none">
          <Image
            src="/img/logo/logo-sm.png"
            width={"80"}
            height={"80"}
            alt="Logo"
          ></Image>
        </div>
        <div className="flex items-center justify-center hover:text-slate-400 transition-colors ease-in delay-200">
          <ul className="flex justify-center md:justify-end gap-x-5 gap-y-2 items-center flex-wrap uppercase  text-xs tracking-widest ">
            <Link href="#about">
              <li className="hover:text-black">Обо мне</li>
            </Link>

            <Link href="#footer">
              <li className="hover:text-black">Контакты</li>
            </Link>
            <Link href="#portfolio">
              <li className="hover:text-black">Проекты</li>
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
}
