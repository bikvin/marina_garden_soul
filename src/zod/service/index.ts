import { z } from "zod";

export const createServiceSchema = z.object({
  text: z.string().min(1, { message: "Содержание не может быть пустым" }),
  imageFileName: z.string().min(1, { message: "Пожалуйста добавьте картинку" }),
  order: z.number().optional(), // Makes 'order' optional
});

export const editServiceSchema = z.object({
  text: z.string().min(1, { message: "Содержание не может быть пустым" }),
  id: z.string().cuid({ message: "Неверный id " }),
  imageFileName: z.string().min(1, { message: "Пожалуйста добавьте картинку" }),
  order: z.number().optional(), // Makes 'order' optional
});
