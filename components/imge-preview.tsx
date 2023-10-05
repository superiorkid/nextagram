import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";

interface Props {
  images: (File & { preview: string })[] | undefined;
}

const ImagePreview = ({ images }: Props) => {
  return (
    <Swiper spaceBetween={10} slidesPerView={1}>
      {images?.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-[100dvh]">
            <Image
              fill
              src={image.preview}
              alt={`previe gambar ke-${index}`}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImagePreview;
