import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      id="footer"
      className=" bg-maingreen text-white px-12 py-20 font-thin tracking-widest"
    >
      <div className="flex flex-col gap-6 justify-center max-w-[500px] mx-auto overflow-x-hidden">
        <h4 className="font-bold mb-6">
          Свяжитесь со мной любым указанным способом. <br />
          Буду рада ответить на любые ваши вопросы!
        </h4>
        <ul className="flex flex-col gap-2">
          <li>
            <a
              href="https://wa.me/7926ххххххх"
              className="flex items-center justify-start gap-2 hover:scale-110 origin-[0%_50%]"
            >
              <Image
                src="/img/icons/social-media/whatsapp.svg"
                width={30}
                height={30}
                alt=""
                className=""
              />
              WhatsApp
            </a>
          </li>
          <li>
            <a
              href="https://t.me/Marina_She26"
              className="flex items-center justify-start gap-2 hover:scale-110 origin-[0%_50%]"
            >
              <Image
                src="/img/icons/social-media/telegram.svg"
                width={30}
                height={30}
                alt=""
              />
              Telegram
            </a>
          </li>

          <li className="instagram">
            <a
              href="https://www.instagram.com/marina_garden_soul/"
              className="flex items-center justify-start gap-2 hover:scale-110 origin-[0%_50%]"
            >
              <Image
                src="/img/icons/social-media/no-insta.svg"
                width={30}
                height={30}
                alt=""
              />
              @marina_garden_soul
            </a>
          </li>
        </ul>
        <p className="font-bold mb-6">+995 59122 03 54</p>
        <p className="font-bold mb-6">Ландшафтный дизайнер Марина Шестакова</p>
      </div>
    </footer>
  );
}
