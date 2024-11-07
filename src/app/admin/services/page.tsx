import ServicesEditList from "@/components/admin/services/edit/servicesEditList";
import Header from "@/components/admin/topMenu/topMenu";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <>
      <Header page="services" />
      <div className="max-w-screen-lg mx-auto ">
        <div className="w-[90%] mx-auto">
          <div className=" mt-10 flex justify-end">
            <Link
              className="link-button link-button-green"
              href="/admin/services/new"
            >
              Новый пункт
            </Link>
          </div>
          <ServicesEditList />
        </div>
      </div>
    </>
  );
}
