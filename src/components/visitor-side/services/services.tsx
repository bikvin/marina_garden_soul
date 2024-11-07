import React from "react";
import ServicesLi from "./services-li";

export default function Services({
  services,
}: {
  services: {
    id: string;
    text: string;
    imageFileName: string;
    order: number | null;
  }[];
}) {
  return (
    <section className="py-5 max-w-screen-lg mx-auto mb-20 overflow-x-hidden md:w-2/3 px-8 md:px-0">
      <div className="">
        <h3 className="font-cormorant text-xl md:text-2xl uppercase tracking-[.25em] font-thin mb-6 border-b-2 border-maingreen">
          Мои услуги:
        </h3>
      </div>

      <ul className="">
        {/* <ServicesLi
          imageLink="/img/services/project.png"
          text="Разработка ландшафтного проекта с учетом ваших пожеланий и
            особенностей участка"
        />

        <ServicesLi
          imageLink="/img/services/flowers.png"
          text="Озеленение и подбор растений с учетом климата и условий"
        />

        <ServicesLi
          imageLink="/img/services/lawn.png"
          text="Устройство газонов"
        />

        <ServicesLi
          imageLink="/img/services/cafe.png"
          text="Озеленение интерьеров кафе и ресторанов"
        />

        <ServicesLi
          imageLink="/img/services/phytowall.png"
          text="Создание фитостен"
        /> */}
        {services.map((service) => (
          <ServicesLi
            text={service.text}
            imageLink={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_PROTOCOL}://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_LINK}/services/${service.imageFileName}`}
            key={service.id}
          />
        ))}
      </ul>
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
