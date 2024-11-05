"use client";
import { useFormState } from "react-dom";
import FormButton from "@/components/common/formButton";
import { editSettings } from "@/actions/settings/edit/editSettings";
import FormInput from "@/components/common/formInput";

export default function SettingsForm({
  main_header = "",
  description_header = "",
  description = "",
  whatsapp = "",
  telegram = "",
  instagram = "",
  phone1 = "",
  phone2 = "",
}: {
  main_header: string;
  description_header: string;
  description: string;
  whatsapp: string;
  telegram: string;
  instagram: string;
  phone1: string;
  phone2: string;
}) {
  const [formState, action] = useFormState(editSettings, {
    errors: {},
  });

  let successMessage = null;
  if (formState.success) {
    successMessage = formState.success.message;
  }

  return (
    <form className={`admin-form`} action={action}>
      <FormInput
        name="main_header"
        formState={formState}
        defaultValue={main_header}
      >
        Основной заголовок
      </FormInput>
      <div className="admin-horizontal-line"></div>
      <FormInput
        name="description_header"
        formState={formState}
        defaultValue={description_header}
      >
        Заголовое описания
      </FormInput>

      <FormInput
        name="description"
        formState={formState}
        defaultValue={description}
      >
        Описание
      </FormInput>
      <div className="admin-horizontal-line"></div>
      <FormInput name="whatsapp" formState={formState} defaultValue={whatsapp}>
        Whatsapp
      </FormInput>
      <FormInput name="telegram" formState={formState} defaultValue={telegram}>
        Telegram
      </FormInput>

      <FormInput
        name="instagram"
        formState={formState}
        defaultValue={instagram}
      >
        Instagram
      </FormInput>
      <FormInput name="phone1" formState={formState} defaultValue={phone1}>
        Телефон 1
      </FormInput>

      <FormInput name="phone2" formState={formState} defaultValue={phone2}>
        Телефон 2
      </FormInput>

      {formState.errors && (
        <div className="error">{formState.errors?._form?.join(", ")}</div>
      )}

      <div className="flex justify-center mt-10 mb-10">
        <FormButton successMessage={successMessage}>Сохранить</FormButton>
      </div>
    </form>
  );
}
