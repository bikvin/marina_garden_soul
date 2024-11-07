"use client";
import { useFormState } from "react-dom";
import FormButton from "@/components/common/formButton";

import { useState } from "react";
import { createService } from "@/actions/services/create";
import { editService } from "@/actions/services/edit";
import FormInput from "@/components/common/formInput";
import DropzoneInput from "@/components/admin/services/dropzone/dropzoneInput";

export default function CreateEditServiceForm({
  id,
  text,
  imageFileName,
  order,
  isEdit = false,
}: {
  id?: string;
  text?: string;
  imageFileName?: string;
  order?: number | null;
  isEdit?: boolean;
}) {
  const usedAction = isEdit ? editService : createService;

  const [formState, action] = useFormState(usedAction, {
    errors: {},
  });

  const [fileName, setFileName] = useState<string>(imageFileName || "");

  const handleFileChange = (newFileName: string) => {
    setFileName(newFileName);
    console.log("File changed");
  };

  return (
    <form className={`admin-form`} action={action}>
      <FormInput name="text" formState={formState} defaultValue={text}>
        Заголовок
      </FormInput>

      <div>
        <label htmlFor="dropzone">Картинка</label>
        <DropzoneInput
          handleFileChange={handleFileChange}
          dbSavedFileName={imageFileName}
        />
        {formState.errors && (
          <div className="error">
            {formState.errors?.imageFileName?.join(", ")}
          </div>
        )}
      </div>

      <div className="mt-8">
        <label htmlFor="order">Порядок показа:</label>
        <div className="w-16">
          <input
            name="order"
            type="number"
            defaultValue={order !== null ? order : ""}
          ></input>
        </div>
        {formState.errors && (
          <div className="error">{formState.errors?.order?.join(", ")}</div>
        )}
      </div>

      {formState.errors && (
        <div className="error">{formState.errors?._form?.join(", ")}</div>
      )}

      <div className="flex justify-center mt-4">
        <FormButton small={true}>
          {isEdit ? "Сохранить" : "Создать"} пункт
        </FormButton>
      </div>

      {isEdit && <input type="hidden" name="id" value={id} />}
      <input type="hidden" name="imageFileName" value={fileName} />
    </form>
  );
}
