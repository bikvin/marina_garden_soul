"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface DeleteServiceFormState {
  errors: {
    _form?: string[];
  };
}

export async function deleteService(
  formState: DeleteServiceFormState,
  formData: FormData
): Promise<DeleteServiceFormState> {
  const id = formData.get("id");

  console.log(id);

  if (!id) {
    throw new Error("Что-то пошло не так. Id не найден.");
  }

  if (typeof id !== "string") {
    throw new Error("Что-то пошло не так. Id нeверный.");
  }

  try {
    await db.service.delete({
      where: {
        id: id,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath("/admin/services");
  revalidatePath("/");

  redirect("/admin/services");
}
