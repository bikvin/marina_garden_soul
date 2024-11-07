"use client";
import { useFormState } from "react-dom";
import FormButton from "@/components/common/formButton";
import { deleteService } from "@/actions/services/delete";

export default function DeleteServiceForm(props: { id: string }) {
  const [formState, action] = useFormState(deleteService, {
    errors: {},
  });
  return (
    <form action={action}>
      <FormButton color={"red"} small={true}>
        Удалить
      </FormButton>
      <input type="hidden" name="id" value={props.id} />
      {formState.errors && (
        <div className="error">{formState.errors?._form?.join(", ")}</div>
      )}
    </form>
  );
}
