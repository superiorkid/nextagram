"use client";

import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import Image from "next/image";

const Stories = () => {
  return (
    <Swiper spaceBetween={10} slidesPerView={7} className="flex-none space-x-3">
      {Array.from({ length: 12 }).map((_, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-12 w-12">
            <Image
              fill
              src="https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="photo profile"
              className="object-cover rounded-full"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Stories;
