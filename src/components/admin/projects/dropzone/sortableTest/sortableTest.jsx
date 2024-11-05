"use client";

import classes from "./sortableTest.module.css";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./sortableTestItem";

const tempPhotoNames = [
  {
    name: "3bdc28be-6191-4259-b4e9-a15c99c9f985.png",
    order: 3,
    id: 1,
  },
  {
    name: "769a9326-cad9-4618-a4b8-0deede629977.jpeg",
    order: 2,
    id: 2,
  },
  {
    name: "d8fdddfb-1848-42ba-9c0c-4a99c38ae487.png",
    order: 1,
    id: 3,
  },
  {
    name: "3bdc28be-6191-4259-b4e9-a15c99c9f985.png",
    order: 3,
    id: 4,
  },
  {
    name: "769a9326-cad9-4618-a4b8-0deede629977.jpeg",
    order: 2,
    id: 5,
  },
  {
    name: "d8fdddfb-1848-42ba-9c0c-4a99c38ae487.png",
    order: 1,
    id: 6,
  },
];

export default function SortableTest() {
  const [items, setItems] = useState(tempPhotoNames);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className={classes.sortableContainer}>
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id} name={item.name} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.map((item) => item.id).indexOf(active.id);
        const newIndex = items.map((item) => item.id).indexOf(over.id);

        const newArr = arrayMove(items, oldIndex, newIndex);

        return newArr;
      });
    }
  }
}
