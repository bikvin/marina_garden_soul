import SingleServiceEditCard from "./singleServiceEditCard";
// import classes from "./accordionItemsEdit.module.css";
import { db } from "@/db";

export default async function ServiceEditList() {
  const itemsData = await db.service.findMany({
    orderBy: [
      { order: "asc" }, // Primary sort by 'order' column
      { createdAt: "desc" }, // Secondary sort by 'createdAt' column
    ],
  });

  return (
    <div className={`mt-10`}>
      {itemsData.map((item) => (
        <SingleServiceEditCard
          key={item.id}
          id={item.id}
          text={item.text}
          filename={item.imageFileName}
        />
      ))}
    </div>
  );
}
