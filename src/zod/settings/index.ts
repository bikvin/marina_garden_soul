import { z } from "zod";

export const editSettingsSchema = z.object({
  main_header: z.string().min(1, { message: "Значение не может быть пустым" }),
  description_header: z
    .string()
    .min(1, { message: "Значение не может быть пустым" }),
  description: z.string().min(1, { message: "Значение не может быть пустым" }),
  whatsapp: z.string().min(1, { message: "Значение не может быть пустым" }),
  telegram: z.string().min(1, { message: "Значение не может быть пустым" }),
  instagram: z.string().min(1, { message: "Значение не может быть пустым" }),
  phone1: z.string().min(1, { message: "Значение не может быть пустым" }),
  phone2: z.string().min(1, { message: "Значение не может быть пустым" }),
});
