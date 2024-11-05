import TopMenu from "@/components/admin/topMenu/topMenu";

import EditProjectsForm from "@/components/admin/projects/edit/editProjectsForm";
import { db } from "@/db";

export default async function ProjectsEditPage() {
  const projects = await db.project.findUnique({ where: { id: 1 } });

  let arrString = "[]"; // if no values set it to empty array
  if (projects) {
    arrString = projects.fileNamesArr;
  }

  const projectsData = JSON.parse(arrString);

  return (
    <>
      <TopMenu page="projects" />
      <div className="max-w-screen-lg mx-auto ">
        <div className={`adminFormContainer w-[80%]`}>
          <h1 className="admin-form-header mt-10">Мои проекты</h1>
          <EditProjectsForm projectsData={projectsData} />
        </div>
      </div>
    </>
  );
}
