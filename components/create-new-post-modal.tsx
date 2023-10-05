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
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import { RxAvatar } from "react-icons/rx";
import UploadImageDropzone from "./upload-image-dropzone";

import "swiper/css";
import ImagePreview from "./imge-preview";

interface Props {
  currentUser: User | null;
}

function CreateNewPostModal({ currentUser }: Props) {
  const [files, setFiles] = useState<(File & { preview: string })[]>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <button className="text-base font-light hover:bg-gray-100 py-2.5 px-3 rounded-md text-left outline-none">
          <GoPlusCircle className="w-6 h-6 inline mr-2.5" />
          Create
        </button>
      </DialogTrigger>

      <DialogContent
        className={cn("p-0 max-w-[61dvw]", files?.length && "max-w-[79dvw]")}
      >
        <form
          className="w-full"
          onSubmit={(event) => {
            setOpenModal((modal) => false);
          }}
        >
          <DialogHeader className="px-3 py-2.5">
            <div className="flex items-center justify-between">
              <button
                type="button"
                aria-label="close modal"
                onClick={(event) => setOpenModal((modal) => false)}
              >
                <FiArrowLeft className="w-6 h-6" />
              </button>
              <DialogTitle className="text-center text-base tracking-wide">
                Create new post
              </DialogTitle>
              <button
                type="submit"
                aria-label="upload label"
                className="font-bold text-sky-500 hover:text-sky-600 transition-all duration-500"
              >
                Share
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
                <ImagePreview images={files} />
              ) : (
                <UploadImageDropzone files={files} setFiles={setFiles} />
              )}
            </div>
            <div className={cn("w-[22dvw] hidden", files?.length && "block")}>
              <div className="p-3 flex items-center space-x-3">
                {/* image */}
                {currentUser?.image ? (
                  <div className="relative w-8 h-8">
                    <Image
                      fill
                      src={currentUser.image!}
                      alt="profile photo"
                      className="object-contain rounded-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <RxAvatar className="w-8 h-8" />
                )}
                <p className="text-sm font-bold">{currentUser?.name}</p>
              </div>
              <textarea
                placeholder="Write a caption..."
                className="w-full h-[15dvh] focus:outline-none p-1 resize-none text-sm border-b-2"
              />
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Type Location (Optional)"
                className="focus:outline-none px-1 py-2 text-sm border-b-2 w-full"
              />
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Select tags (Optional) [up to 3 tags]"
                className="focus:outline-none px-1 py-2 text-sm w-full"
              />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNewPostModal;
