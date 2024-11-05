import Header from "@/components/visitor-side/header/header";
import Parallax from "@/components/visitor-side/parallax";
import About from "@/components/visitor-side/about/about";
import Services from "@/components/visitor-side/services/services";
import Portfolio from "@/components/visitor-side/portfolio/portfolio";
import Footer from "@/components/visitor-side/footer/Footer";
import HeroSection from "@/components/visitor-side/hero-section/HeroSection";
import { db } from "@/db";

export default async function Home() {
  let settings;
  // let about;

  try {
    const [settingsData] = await Promise.all([
      db.settings.findMany({
        where: {
          field: {
            in: [
              "main_header",
              "description_header",
              "description",
              "whatsapp",
              "telegram",
              "instagram",
              "phone1",
              "phone2",
            ],
          },
        },
      }),
      // db.about.findMany({
      //   where: {
      //     squareNumber: {
      //       in: [1, 2, 3, 4],
      //     },
      //   },
      // }),
    ]);

    if (!settingsData) {
      return <div className="text-red-800">Данные не найдены.</div>;
    }

    settings = {
      main_header:
        settingsData.find((el) => el.field === "main_header")?.value || "", // set either value from db or empty string
      description_header:
        settingsData.find((el) => el.field === "description_header")?.value ||
        "",
      description:
        settingsData.find((el) => el.field === "description")?.value || "",
      whatsapp: settingsData.find((el) => el.field === "whatsapp")?.value || "",
      telegram: settingsData.find((el) => el.field === "telegram")?.value || "",
      instagram:
        settingsData.find((el) => el.field === "instagram")?.value || "",
      phone1: settingsData.find((el) => el.field === "phone1")?.value || "",
      phone2:
        settingsData.find((element) => element.field === "phone2")?.value || "",
    };

    // about = {
    //   square1text: aboutData.find((el) => el.squareNumber === 1)?.text || "",
    //   square2text: aboutData.find((el) => el.squareNumber === 2)?.text || "",
    //   square3text: aboutData.find((el) => el.squareNumber === 3)?.text || "",
    //   square4text: aboutData.find((el) => el.squareNumber === 4)?.text || "",
    // };
  } catch (err) {
    console.log(err);
    return <div className="text-red-800">Ошибка при загрузке данных.</div>;
  }

  return (
    <>
      <Header />

      <HeroSection main_header={settings.main_header} />
      <About
        description_header={settings.description_header}
        description={settings.description}
      />
      <Services />
      <Parallax imageLink="/img/bg/garden-3.jpg" height={400}></Parallax>
      <Portfolio />
      <Footer
        whatsapp={settings.whatsapp}
        telegram={settings.telegram}
        instagram={settings.instagram}
        phone1={settings.phone1}
        phone2={settings.phone2}
      />
    </>
  );
}
