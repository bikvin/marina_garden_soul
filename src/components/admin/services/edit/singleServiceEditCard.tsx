import Image from "next/image";
import Link from "next/link";
// import classes from "./accordionItemsEdit.module.css";

export default function SingleHelpEditCard({
  id,
  text,
  filename,
}: {
  id: string;
  text: string;
  filename: string;
}) {
  return (
    <div
      className={
        "flex flex-col md:flex-row justify-between px-10 py-5 border-b"
      }
    >
      <div className={"flex justify-between grow items-center pr-20"}>
        <h3 className="gray-subheader mb-4">{text}</h3>
        <Image
          height={150}
          width={150}
          alt=""
          src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_PROTOCOL}://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_LINK}/services/${filename}`}
        ></Image>
      </div>
      <div className={`mt-8 md:mt-0 flex flex-col justify-center`}>
        <Link
          className="link-button link-button-blue mb-2"
          href={`/admin/services/edit/${id}`}
        >
          Редактировать
        </Link>

        <Link
          className="link-button link-button-red"
          href={`/admin/services/delete/${id}`}
        >
          Удалить
        </Link>
      </div>
    </div>
  );
}
