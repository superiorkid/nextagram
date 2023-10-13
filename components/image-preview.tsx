import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { TPost } from "@/lib/validations/post.validation";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import "swiper/css";
import SlideNextButton from "./slide-next-button";
import SlidePrevButton from "./slide-prev-button";
import { TbTrashX } from "react-icons/tb";
import React from "react";

interface Props {
  images: (File & { preview: string })[] | undefined;
  setFiles: Dispatch<
    SetStateAction<
      | (File & {
          preview: string;
        })[]
      | undefined
    >
  >;
  setValue: UseFormSetValue<TPost>;
  getValues: UseFormGetValues<TPost>;
}

const ImagePreview = ({ images, setFiles, setValue, getValues }: Props) => {
  const removeImageHandler = (fileName: string) => {
    setFiles((files) => files?.filter((file) => file.name !== fileName));

    setValue(
      "images",
      // @ts-ignore
      getValues("images").filter((file) => file.name !== fileName),
      { shouldValidate: true }
    );
  };

  return (
    <Swiper spaceBetween={10} slidesPerView={1} allowTouchMove={false}>
      {images?.length! > 1 && (
        <React.Fragment>
          <SlidePrevButton
            className="absolute left-3 top-1/2 -translate-y-2/4 z-10 bg-white text-gray-800 rounded-full hover:bg-gray-200 hover:text-gray-500"
            iconSize="8"
          />
          <SlideNextButton
            className="absolute right-3 top-1/2 -translate-y-2/4 z-10 bg-white text-gray-800 rounded-full hover:bg-gray-200 hover:text-gray-500"
            iconSize="8"
          />
        </React.Fragment>
      )}

      {images?.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-[90dvh]">
            <Image
              fill
              src={image.preview}
              alt={`previe gambar ke-${index}`}
              className="object-contain -z-10"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <button
            className="absolute top-5 right-5 z-10 rounded-md bg-rose-200 hover:bg-rose-500 hover:text-white transition-all duration-300"
            onClick={() => removeImageHandler(image.name)}
          >
            <TbTrashX className="p-1 w-8 h-8" />
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImagePreview;
