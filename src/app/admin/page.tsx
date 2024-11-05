import SettingsForm from "@/components/admin/settings/SettingsForm";
import Header from "@/components/admin/topMenu/topMenu";
import { db } from "@/db";

export default async function AdminPage() {
  let settings;

  try {
    const data = await db.settings.findMany({
      where: {
        OR: [
          { field: "main_header" },
          { field: "description_header" },
          { field: "description" },
          { field: "whatsapp" },
          { field: "telegram" },
          { field: "instagram" },
          { field: "phone1" },
          { field: "phone2" },
        ],
      },
    });

    if (data) {
      settings = {
        main_header: data.find((el) => el.field === "main_header")?.value || "", // set either value from db or empty string
        description_header:
          data.find((el) => el.field === "description_header")?.value || "",
        description: data.find((el) => el.field === "description")?.value || "",
        whatsapp: data.find((el) => el.field === "whatsapp")?.value || "",
        telegram: data.find((el) => el.field === "telegram")?.value || "",
        instagram: data.find((el) => el.field === "instagram")?.value || "",
        phone1: data.find((el) => el.field === "phone1")?.value || "",
        phone2: data.find((element) => element.field === "phone2")?.value || "",
      };
    } else {
      return <div className="text-red-800">Данные не найдены.</div>;
    }
  } catch (err) {
    console.log(err);
    return <div className="text-red-800">Ошибка при загрузке данных.</div>;
  }

  return (
    <>
      <Header page="main" />

      <div className="max-w-screen-lg mx-auto ">
        <div className="w-[90%] md:w-2/3 mx-auto">
          <h1 className="admin-form-header mt-10">Основные настройки</h1>
          <SettingsForm {...settings} />
        </div>
      </div>
    </>
  );
}
