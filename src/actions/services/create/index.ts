"use server";

import { db } from "@/db";
import { createServiceSchema } from "@/zod/service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface CreateServiceFormState {
  errors: {
    text?: string[];
    imageFileName?: string[];
    order?: string[];
    _form?: string[];
  };
}

export async function createService(
  formState: CreateServiceFormState,
  formData: FormData
): Promise<CreateServiceFormState> {
  try {
    const text = formData.get("text");
    const imageFileName = formData.get("imageFileName");
    const order = formData.get("order");

    const parsedOrder = order ? Number(order) : undefined;

    const result = createServiceSchema.safeParse({
      text: text,
      imageFileName: imageFileName,
      order: parsedOrder,
    });

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    await db.service.create({
      data: {
        text: result.data.text,
        imageFileName: result.data.imageFileName,
        order: result.data.order,
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
        errors: { _form: ["Что-то пошло не так"] },
      };
    }
  }

  revalidatePath("/admin/services");
  revalidatePath("/");

  redirect("/admin/services");
}
