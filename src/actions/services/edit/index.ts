"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";
import { editServiceSchema } from "@/zod/service";
import { revalidatePath } from "next/cache";

interface EditServiceFormState {
  errors: {
    text?: string[];
    id?: string[];
    order?: string[];
    imageFileName?: string[];
    _form?: string[];
  };
}

export async function editService(
  formState: EditServiceFormState,
  formData: FormData
): Promise<EditServiceFormState> {
  // console.log("formData ", formData);

  const order = formData.get("order");

  const parsedOrder = order ? Number(order) : undefined;

  const result = editServiceSchema.safeParse({
    id: formData.get("id"),
    text: formData.get("text"),
    order: parsedOrder,
    imageFileName: formData.get("imageFileName") as string | null,
  });

  // console.log(result.error);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // console.log(result);

  try {
    await db.service.update({
      where: {
        id: result.data.id,
      },
      data: {
        text: result.data.text,
        imageFileName: result.data.imageFileName,
        order: result.data.order,
      },
    });

    revalidatePath("/admin/services");
    revalidatePath("/");
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      errors: return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  redirect("/admin/services");
}
