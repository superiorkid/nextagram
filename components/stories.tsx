"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import SlideNextButton from "./slide-next-button";
import SlidePrevButton from "./slide-prev-button";
import toast from "react-hot-toast";
import { Prisma } from "@prisma/client";
;
import StoryView from "./story-view";

interface Props {
  stories: Prisma.StoriesGetPayload<{
    include: {
      author: true;
    };
  }>[];
}

const Stories = ({ stories }: Props) => {
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
      className="mb-14 hover:cursor-pointer"
    >
      <SlidePrevButton className="absolute left-1 top-1/2 -translate-y-3/4 z-10 bg-white text-gray-800 rounded-full hover:bg-gray-200 hover:text-gray-500" />
      <SlideNextButton className="absolute right-1 top-1/2 -translate-y-3/4 z-10 bg-white text-gray-800 rounded-full hover:bg-gray-200 hover:text-gray-500" />
      {stories.map((story, index) => (
        <SwiperSlide className="p-1.5" key={index}>
          <StoryView story={story} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Stories;
