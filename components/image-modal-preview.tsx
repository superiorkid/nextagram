"use client";

import React from "react";
import Image from "next/image";
import { SwiperSlide, Swiper } from "swiper/react";
import { Image as Img } from "@prisma/client";
import SlideNextButton from "./slide-next-button";
import SlidePrevButton from "./slide-prev-button";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface Props {
  images: Img[];
}

const ImageModalPreview = ({ images }: Props) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      allowTouchMove={false}
      modules={[Pagination]}
      pagination={(images.length > 1, { clickable: true })}
    >
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
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-[90dvh]">
            <Image
              fill
              src={image.path}
              alt="image example"
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={80}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageModalPreview;
