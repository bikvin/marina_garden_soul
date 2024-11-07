import CreateEditServiceForm from "@/components/admin/services/create-edit/Create-Edit";
import Header from "@/components/admin/topMenu/topMenu";

export default function CreateServicePage() {
  return (
    <>
      <Header page="help" />
      <div className="max-w-screen-lg mt-10 mx-auto flex justify-center">
        <div className="w-[90%] md:w-1/2  mb-10">
          <h2 className="mt-10 admin-form-header">Создать новую услугу</h2>
          <CreateEditServiceForm />
        </div>
      </div>
    </>
  );
}
