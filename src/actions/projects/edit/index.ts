"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";

interface EditProjectsFormState {
  errors: {
    projectsArr?: string[];
    id?: string[];
    _form?: string[];
  };
}

export async function editProjects(
  formState: EditProjectsFormState,
  formData: FormData
): Promise<EditProjectsFormState> {
  const projectsArrString = formData.get("projectsArr");

  if (!projectsArrString || typeof projectsArrString !== "string") {
    return {
      errors: {
        _form: ["Error updating. String must not be null."],
      },
    };
  }

  try {
    await db.project.upsert({
      where: {
        id: 1, // all is stored in an entry with id=1
      },
      update: {
        fileNamesArr: projectsArrString,
      },
      create: {
        fileNamesArr: projectsArrString,
        id: 1,
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
  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin");
}
