"use server";

import { db } from "@/db";
import { editSettingsSchema } from "@/zod/settings";

import { revalidatePath } from "next/cache";

interface EditSettingsFormState {
  errors?: {
    main_header?: string[];
    description_header?: string[];
    description?: string[];
    whatsapp?: string[];
    telegram?: string[];
    instagram?: string[];
    phone1?: string[];
    phone2?: string[];
    _form?: string[];
  };
  success?: {
    message?: string;
  };
}

export async function editSettings(
  formState: EditSettingsFormState,
  formData: FormData
): Promise<EditSettingsFormState> {
  const main_header = formData.get("main_header");
  const description_header = formData.get("description_header");
  const description = formData.get("description");
  const whatsapp = formData.get("whatsapp");
  const telegram = formData.get("telegram");
  const instagram = formData.get("instagram");
  const phone1 = formData.get("phone1");
  const phone2 = formData.get("phone2");

  const result = editSettingsSchema.safeParse({
    main_header: main_header,
    description_header: description_header,
    description: description,
    whatsapp: whatsapp,
    telegram: telegram,
    instagram: instagram,
    phone1: phone1,
    phone2: phone2,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await Promise.all([
      db.settings.upsert({
        where: { field: "main_header" },
        update: { value: result.data.main_header },
        create: { field: "main_header", value: result.data.main_header },
      }),
      db.settings.upsert({
        where: { field: "description_header" },
        update: { value: result.data.description_header },
        create: {
          field: "description_header",
          value: result.data.description_header,
        },
      }),
      db.settings.upsert({
        where: { field: "description" },
        update: { value: result.data.description },
        create: { field: "description", value: result.data.description },
      }),
      db.settings.upsert({
        where: { field: "whatsapp" },
        update: { value: result.data.whatsapp },
        create: {
          field: "whatsapp",
          value: result.data.whatsapp,
        },
      }),
      db.settings.upsert({
        where: { field: "telegram" },
        update: { value: result.data.telegram },
        create: {
          field: "telegram",
          value: result.data.telegram,
        },
      }),
      db.settings.upsert({
        where: { field: "instagram" },
        update: { value: result.data.instagram },
        create: {
          field: "instagram",
          value: result.data.instagram,
        },
      }),
      db.settings.upsert({
        where: { field: "phone1" },
        update: { value: result.data.phone1 },
        create: {
          field: "phone1",
          value: result.data.phone1,
        },
      }),
      db.settings.upsert({
        where: { field: "phone2" },
        update: { value: result.data.phone2 },
        create: {
          field: "phone2",
          value: result.data.phone2,
        },
      }),

      // Add more upserts as needed
    ]);
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
  revalidatePath("/");
  revalidatePath("/admin/settings");
  return {
    success: { message: "Сохранено" },
  };
}
