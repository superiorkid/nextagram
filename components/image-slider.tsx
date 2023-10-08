"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import { Image as Img } from "@prisma/client";
import Image from "next/image";
import SlidePrevButton from "./slide-prev-button";
import SlideNextButton from "./slide-next-button";

import "swiper/css";
import "swiper/css/pagination";

interface Props {
  images: Img[];
}

const ImageSlider = ({ images }: Props) => {
  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={1}
      modules={[Pagination]}
      pagination={{ clickable: true }}
    >
      <SlidePrevButton
        className="absolute left-3 top-1/2 -translate-y-2/4 z-10 bg-white text-gray-800 rounded-full hover:bg-gray-200 hover:text-gray-500"
        iconSize="6"
      />

      <SlideNextButton
        className="absolute right-3 top-1/2 -translate-y-2/4 z-10 bg-white text-gray-800 rounded-full hover:bg-gray-200 hover:text-gray-500"
        iconSize="6"
      />
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-[507px] bg-gray-700">
            <Image
              fill
              src={image.path.replace("public", "")}
              alt={`${image.name} image`}
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={75}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;