"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import classes from "./sortableTest.module.css";
import Image from "next/image";

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={classes.sortableItem}
      {...attributes}
      {...listeners}
    >
      {
        <div key={props.id} className={classes.imagePreview}>
          <Image
            src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_PROTOCOL}://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_LINK}/projects/${props.name}`}
            alt=""
            width={320}
            height={240}
          />
        </div>
      }
    </div>
  );
}
