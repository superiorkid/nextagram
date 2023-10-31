"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from "next/image";
import { useState, useTransition } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import UploadImageDropzone from "./upload-image-dropzone";

import { createPost } from "@/_actions/post.action";
import { postSchema, TPost } from "@/lib/validations/post.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SvgSpinners3DotsMove from "./icons/SvgSpinners3DotsMove";
import ImagePreview from "./image-preview";

import "swiper/css";

interface Props {
  currentUser: User | null;
  variant?: "MOBILE" | "DESKTOP";
}

function CreateNewPostModal({ currentUser, variant = "DESKTOP" }: Props) {
  const [files, setFiles] = useState<(File & { preview: string })[]>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const {
    getValues,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TPost>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      caption: "",
      images: [],
      location: "",
    },
  });

  const handlePostSubmit = (data: TPost) => {
    let formData = new FormData();

    formData.append("caption", data.caption);

    for (let image of data.images) {
      formData.append("images", image);
    }

    if (data.location) formData.append("location", data.location);

    startTransition(async () => {
      await createPost(formData)
        .then((callback) => {
          setFiles((files) => []);
          setOpenModal((open) => false);
          toast.success("submitted");
          reset();
        })
        .catch((error) => {
          console.log("Error");
        });
    });
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild={variant === "DESKTOP"}>
        {variant === "MOBILE" ? (
          <GoPlusCircle className="w-6 h-6" />
        ) : (
          <button className="text-base font-light hover:bg-gray-100 py-2.5 px-3 rounded-md text-left outline-none dark:hover:bg-gray-700">
            <GoPlusCircle className="w-6 h-6 inline mr-2.5" />
            Create
          </button>
        )}
      </DialogTrigger>

      <DialogContent
        className={cn("p-0 max-w-[61dvw]", files?.length && "max-w-[79dvw]")}
      >
        <form className="w-full" onSubmit={handleSubmit(handlePostSubmit)}>
          <DialogHeader className="px-3 py-2.5">
            <div className="flex items-center justify-between">
              <button
                type="button"
                aria-label="close modal"
                disabled={isPending}
                className={cn(isPending && "text-gray-400")}
                onClick={(event) => {
                  setOpenModal((modal) => false);
                  setFiles((files) => []);
                }}
              >
                <FiArrowLeft className="w-6 h-6" />
              </button>
              <DialogTitle className="text-center text-base tracking-wide">
                Create new post
              </DialogTitle>
              <button
                disabled={isPending}
                type="submit"
                aria-label="upload label"
                className={cn(
                  "font-bold text-sky-500 hover:text-sky-600 transition-all duration-500",
                  !files?.length && "invisible"
                )}
              >
                {isPending ? (
                  <SvgSpinners3DotsMove className="w-5 h-5" />
                ) : (
                  "Share"
                )}
              </button>
            </div>
          </DialogHeader>
          <div
            className={cn(
              "flex h-[87dvh] border-t-2",
              files?.length && "max-w-[79dvw]"
            )}
          >
            <div className="flex-1 overflow-hidden">
              {files?.length ? (
                <ImagePreview
                  images={files}
                  setFiles={setFiles}
                  setValue={setValue}
                  getValues={getValues}
                />
              ) : (
                <UploadImageDropzone
                  files={files}
                  setFiles={setFiles}
                  setValue={setValue}
                />
              )}
            </div>

            <div className={cn("w-[22dvw] hidden", files?.length && "block")}>
              <div className="p-3 flex items-center space-x-3">
                {/* image */}
                <div className="relative w-8 h-8">
                  <Image
                    fill
                    src={
                      currentUser?.image ??
                      `https://api.dicebear.com/7.x/micah/png?seed=${currentUser?.email}`
                    }
                    alt={`${currentUser?.name} photo`}
                    className="object-contain rounded-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <p className="text-sm font-bold">{currentUser?.name}</p>
              </div>
              <div className="border-b-2">
                <textarea
                  placeholder="Write a caption..."
                  className={cn(
                    "w-full h-[15dvh] focus:outline-none p-1 resize-none text-sm dark:bg-gray-900",
                    errors.caption && "placeholder:text-rose-300"
                  )}
                  {...register("caption")}
                />
                <span className="text-sm text-rose-500">
                  {errors.caption?.message}
                </span>
              </div>
              <div className="border-b-2">
                <input
                  placeholder="Type Location (Optional)"
                  className={cn(
                    "focus:outline-none px-1 py-2 text-sm  w-full dark:bg-gray-900"
                  )}
                  disabled={isPending}
                  {...register("location")}
                />
                <span className="text-sm text-rose-500">
                  {errors.location?.message}
                </span>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNewPostModal;
