"use client";

import React from "react";
import Image from "next/image";
import { SwiperSlide, Swiper } from "swiper/react";
import { Image as Img } from "@prisma/client";

// Import Swiper styles
import "swiper/css";

interface Props {
  images: Img[];
}

const ImageModalPreview = ({ images }: Props) => {
  return (
    <Swiper spaceBetween={10} slidesPerView={1} allowTouchMove={false}>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-[90dvh] ">
            <Image
              fill
              src={image.path.replace("public", "")}
              alt="image example"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageModalPreview;
