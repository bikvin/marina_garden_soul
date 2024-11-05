"use client";
import { useFormState } from "react-dom";
import FormButton from "@/components/common/formButton";

import { useState } from "react";
import * as actions from "@/actions/projects/edit";
import DropzoneInput from "@/components/admin/projects/dropzone/dropzoneInput";

interface Project {
  name: string;
  id: string;
}

export default function EditProjectsForm({
  projectsData,
}: {
  projectsData: Project[];
}) {
  const [formState, action] = useFormState(actions.editProjects, {
    errors: {},
  });

  // const [articleValue, setArticleValue] = useState(text);
  // const [fileName, setFileName] = useState<string>(imageFileName);

  const [arrString, setArrString] = useState(JSON.stringify(projectsData));

  const updateArrString = (projectsArray: Project[]) => {
    setArrString(JSON.stringify(projectsArray));
  };

  return (
    <form className={`adminForm`} action={action}>
      <div>
        {/* <label htmlFor="dropzone">Картинка для обложки</label> */}
        <DropzoneInput
          dbSavedFileNames={projectsData}
          updateArrString={updateArrString}
        />
        {/* {formState.errors && (
          <div className="error">
            {formState.errors?.imageFileName?.join(", ")}
          </div>
        )} */}
      </div>

      <FormButton>Сохранить</FormButton>
      {formState.errors && (
        <div className="error">{formState.errors?._form?.join(", ")}</div>
      )}
      {formState.errors && (
        <div className="error">{formState.errors?.projectsArr?.join(", ")}</div>
      )}
      {formState.errors && (
        <div className="error">{formState.errors?.id?.join(", ")}</div>
      )}
      {/* <input type="hidden" name="text" value={articleValue} />
      <input type="hidden" name="id" value={id} /> */}
      <input type="hidden" name="projectsArr" value={arrString} />
    </form>
  );
}
