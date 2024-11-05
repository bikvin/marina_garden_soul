import React from "react";
import Image from "next/image";

export default function Footer({
  whatsapp,
  telegram,
  instagram,
  phone1,
  phone2,
}: {
  whatsapp: string;
  telegram: string;
  instagram: string;
  phone1: string;
  phone2: string;
}) {
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
              href={`https://wa.me/${whatsapp}`}
              className="flex items-center justify-start gap-2 hover:scale-110 origin-[0%_50%]"
            >
              <Image
                src="/img/icons/social-media/whatsapp.svg"
                width={30}
                height={30}
                alt=""
                className=""
              />
              WhatsApp: +{whatsapp}
            </a>
          </li>
          <li>
            <a
              href={`https://t.me/${telegram}`}
              className="flex items-center justify-start gap-2 hover:scale-110 origin-[0%_50%]"
            >
              <Image
                src="/img/icons/social-media/telegram.svg"
                width={30}
                height={30}
                alt=""
              />
              Telegram: {telegram}
            </a>
          </li>

          <li className="instagram">
            <a
              href={`https://www.instagram.com/${instagram}/`}
              className="flex items-center justify-start gap-2 hover:scale-110 origin-[0%_50%]"
            >
              <Image
                src="/img/icons/social-media/no-insta.svg"
                width={30}
                height={30}
                alt=""
              />
              Instagram: @marina_garden_soul
            </a>
          </li>
        </ul>
        <div className="mb-6">
          <p className="font-bold">{phone1}</p>
          <p className="font-bold">{phone2}</p>
        </div>

        <p className="font-bold mb-6">Ландшафтный дизайнер Марина Шестакова</p>
      </div>
    </footer>
  );
}
