"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { IoMdImages } from "react-icons/io";
import { UseFormSetValue } from "react-hook-form";
import { TPost } from "@/lib/validations/post.validation";

interface Props {
  files: (File & { preview: string })[] | undefined;
  setFiles: Dispatch<
    SetStateAction<
      | (File & {
          preview: string;
        })[]
      | undefined
    >
  >;
  setValue: UseFormSetValue<TPost>;
}

const UploadImageDropzone = ({ files, setFiles, setValue }: Props) => {
  const { getInputProps, getRootProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg", ".png", ".webp", ".avif"],
    },
    maxSize: 1024 * 1024 * 2,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      setValue(
        "images",
        // @ts-ignore
        acceptedFiles.map((file) => Object.assign(file)),
        { shouldValidate: true }
      );
    },
    onDropRejected(fileRejections, event) {
      setFiles((files) => []);
    },
  });

  useEffect(() => {
    return () => files?.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div
      {...getRootProps({
        className: "h-full w-full flex items-center justify-center flex-col",
      })}
    >
      <input {...getInputProps()} />
      <IoMdImages className="w-24 h-24 text-gray-400" />
      <p className="text-lg font-extralight tracking-wide text-gray-400">
        Drag {"'"}n{"'"} drop some files here, or click to select files
      </p>
    </div>
  );
};

export default UploadImageDropzone;
