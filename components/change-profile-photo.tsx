"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  profileImageSchema,
  TProfileImageSchema,
} from "@/lib/validations/profile.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, useTransition } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { FaTrash } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import {
  changeProfilePicture,
  removeProfilePhoto,
} from "@/_actions/user.action";
import toast from "react-hot-toast";
import { User } from "@prisma/client";

interface Props {
  currentUser: User | null;
}

function ChangeProfilePhoto({ currentUser }: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [files, setFiles] = useState<(File & { preview: string })[]>();

  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<TProfileImageSchema>({
    resolver: zodResolver(profileImageSchema),
    defaultValues: {
      profilePhoto: [],
    },
  });

  const { getRootProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxSize: 1024 * 1024 * 2,
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );

      // @ts-ignore
      setValue("profilePhoto", acceptedFiles, { shouldValidate: true });
    },
  });

  const removeFilesHandler = () => {
    setFiles([]);
    reset();
  };

  const saveProfileChange = (data: TProfileImageSchema) => {
    let formData = new FormData();

    for (let file of data.profilePhoto) {
      formData.append("images", file);
    }

    startTransition(async () => {
      await changeProfilePicture(formData)
        .then(() => {
          toast.success("profile picture changed");
          removeFilesHandler();
          setOpenModal((modal) => false);
        })
        .catch(() => {
          toast.error("failed to change profile picture");
        });
    });
  };

  // TODO: remove profile photo on drive tho
  const removeCurrentProfileHandler = () => {
    startTransition(async () => {
      await removeProfilePhoto()
        .then(() => {
          toast.success("remove profile");
          setOpenModal((modal) => false);
        })
        .catch(() => {
          toast.error("remove profile failed");
        });
    });
  };

  useEffect(() => {
    return () => files?.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <button className="text-sky-500 font-bold text-sm" type="button">
          Change profile photo
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md text-center gap-y-0 p-0 m-0">
        <form onSubmit={handleSubmit(saveProfileChange)}>
          <h1 className="border-b text-xl py-5">Change Profile Photo</h1>
          {!files?.length ? (
            <React.Fragment>
              <div {...getRootProps({ className: "border-b" })}>
                <button
                  className="w-full capitalize text-sm text-sky-500 hover:text-sky-600 font-bold tracking-wide py-3"
                  type="button"
                  onClick={open}
                >
                  upload photo
                </button>
              </div>
              {currentUser?.image && (
                <button
                  type="button"
                  className="border-b rounded-md w-full capitalize text-sm text-rose-500 hover:text-rose-600 font-bold tracking-wide py-3"
                  onClick={removeCurrentProfileHandler}
                >
                  remove current photo
                </button>
              )}
            </React.Fragment>
          ) : (
            <div className="aspect-square relative">
              <Image
                fill
                src={files.at(0)?.preview!}
                alt={`${files.at(0)?.name} image`}
                className="object-cover"
              />
              <button
                type="button"
                onClick={removeFilesHandler}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-md group transition-all duration-500"
              >
                <FaTrash className="h-4 w-4 fill-rose-400 group-hover:fill-rose-500" />
              </button>
            </div>
          )}

          <div
            className={cn(
              "py-3 grid grid-cols-1",
              files?.length && "grid-cols-2"
            )}
          >
            <button
              type="button"
              className="capitalize hover:text-gray-600"
              onClick={() => {
                if (files?.length) removeFilesHandler();

                setOpenModal((modal) => false);
              }}
            >
              cancel
            </button>
            {files?.length === 1 && (
              <button
                type="submit"
                className="font-semibold text-sky-500 hover:text-sky-600"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ChangeProfilePhoto;
