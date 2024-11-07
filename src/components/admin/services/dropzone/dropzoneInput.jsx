"use client";

import { useDropzone } from "react-dropzone";
import classes from "./dropzoneInput.module.css";
import { useCallback, useState } from "react";
import Image from "next/image";
import { BiLoaderAlt } from "react-icons/bi";
import PropTypes from "prop-types";
// import { useMemo } from "react";

function DropzoneInput({ handleFileChange, dbSavedFileName }) {
  const [isUploading, setIsUploading] = useState(false);
  const [randomFileName, setRandomFileName] = useState(dbSavedFileName);

  const onDrop = useCallback((acceptedFiles) => {
    // console.log("onDrop");
    // console.log("acceptedFiles", acceptedFiles);

    if (acceptedFiles.length == 0) return;

    setIsUploading(true);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        // const binaryStr = reader.result;

        const loadToS3 = async () => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("directory", "services");

          try {
            const response = await fetch("/api/s3-upload", {
              method: "POST",
              body: formData,
            });

            const data = await response.json();
            console.log("data.fileName ", data.fileName);
            setRandomFileName(data.fileName);
            handleFileChange(data.fileName);

            setIsUploading(false);
          } catch (error) {
            console.log(error);
            setIsUploading(false);
          }
        };
        loadToS3();
      };
      reader.readAsArrayBuffer(file);
      // reader.readAsDataURL(file);
    });
  }, []);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path} className={classes.fileName}>
      {file.path} - {file.size} байт
    </li>
  ));

  // const fileRejectionItems = fileRejections.map(({ file, errors }) => {
  //   return (
  //     <li key={file.path}>
  //       {file.path} - {file.size} bytes
  //       <ul>
  //         {errors.map((e) => (
  //           <li key={e.code}>{e.message}</li>
  //         ))}
  //       </ul>
  //     </li>
  //   );
  // });

  let dropzoneStyle = `${classes.dropzone}`;

  if (isDragAccept) {
    console.log("accept");
    dropzoneStyle += ` ${classes.accept}`;
  }

  if (isDragReject) {
    console.log("reject");
    dropzoneStyle += ` ${classes.reject}`;
  }

  // const style = useMemo(() => {
  //   {
  //     console.log("sty");
  //     dropzoneStyle = `${classes.dropzone}`;

  //     if (isDragAccept) {
  //       console.log("accept");
  //       dropzoneStyle = `${classes.dropzone} ${classes.accept}`;
  //     }

  //     if (isDragReject) {
  //       console.log("regect");
  //     }
  //   }
  // }, [isDragAccept, isDragReject]);

  return (
    <section className="container">
      <div
        {...getRootProps({
          className: dropzoneStyle,
        })}
      >
        <input {...getInputProps()} />
        <p>Выберите файл или перетащите сюда</p>
      </div>
      <aside>
        {isUploading && (
          <div className={classes.imagePreview}>
            <BiLoaderAlt className={classes.loaderIcon} />
          </div>
        )}

        {!isUploading && randomFileName && (
          <div className={classes.imagePreview}>
            <Image
              src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_PROTOCOL}://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_LINK}/services/${randomFileName}`}
              alt=""
              width={320}
              height={240}
            />
          </div>
        )}
        <ul>{files}</ul>
        <ul>
          {fileRejections.length > 0 && (
            <p className={classes.error}>Выберите не более 1 файла</p>
          )}
        </ul>
      </aside>
    </section>
  );
}

// this is to make dbSavedFileName optional

DropzoneInput.propTypes = {
  handleFileChange: PropTypes.func.isRequired,
  dbSavedFileName: PropTypes.string,
};

export default DropzoneInput;
