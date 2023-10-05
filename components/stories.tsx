"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import SlideNextButton from "./slide-next-button";
import SlidePrevButton from "./slide-prev-button";

const Stories = () => {
  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={5}
      allowTouchMove={false}
      breakpoints={{
        768: {
          slidesPerView: 6,
          spaceBetween: 5,
        },
        1024: {
          slidesPerView: 7,
          spaceBetween: 5,
        },
      }}
      className="mb-14"
    >
      <SlidePrevButton className="absolute left-1 top-1/2 -translate-y-3/4 z-10 bg-white text-gray-800 rounded-full hover:bg-gray-200 hover:text-gray-500" />
      <SlideNextButton className="absolute right-1 top-1/2 -translate-y-3/4 z-10 bg-white text-gray-800 rounded-full hover:bg-gray-200 hover:text-gray-500" />
      {Array.from({ length: 21 }).map((_, index) => (
        <SwiperSlide key={index} className="p-1.5">
          <div className="flex flex-col items-center space-y-1.5">
            <div className="relative w-14 h-14">
              <Image
                fill
                src="https://images.unsplash.com/photo-1514136649217-b627b4b9cfb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                alt="photo profile"
                className="object-cover rounded-full ring-2 ring-pink-500 ring-offset-2 self-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <p className="text-xs">Fatim</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Stories;
