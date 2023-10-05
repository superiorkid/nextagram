"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoMdImages } from "react-icons/io";

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
}

const UploadImageDropzone = ({ files, setFiles }: Props) => {
  const { getInputProps, getRootProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    return () => files?.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

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
