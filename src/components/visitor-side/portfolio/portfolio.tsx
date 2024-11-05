import React from "react";
import EmblaCarousel from "@/components/visitor-side/portfolio/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { db } from "@/db";

export default async function Portfolio() {
  let projectsData = [];

  try {
    const projects = await db.project.findUnique({ where: { id: 1 } });

    if (projects && projects.fileNamesArr) {
      projectsData = JSON.parse(projects.fileNamesArr);
    } else {
      console.warn("No data found or fileNamesArr is empty.");
    }
  } catch (err) {
    console.error("Error fetching certificates:", err);
  }

  // const SLIDES = [
  //   { filename: "dog.jpeg" },
  //   { filename: "fence.jpeg" },
  //   { filename: "variant1.jpeg" },
  //   { filename: "variant2.jpeg" },
  //   { filename: "flowers.jpeg" },
  //   { filename: "plan.jpeg" },
  //   { filename: "pond.jpeg" },
  //   { filename: "pool.jpeg" },
  //   { filename: "trees.jpeg" },
  // ];

  const OPTIONS: EmblaOptionsType = { loop: true };

  return (
    <section
      id="portfolio"
      className="py-5 max-w-screen-lg mx-auto mb-20 overflow-x-hidden md:w-2/3 px-8 md:px-0 mt-16"
    >
      <div className="">
        <h3 className="font-cormorant text-xl md:text-2xl uppercase tracking-[.25em] font-thin border-b-2 border-maingreen">
          Мои проекты:
        </h3>
      </div>
      <EmblaCarousel slides={projectsData} options={OPTIONS} />
    </section>
  );
}
