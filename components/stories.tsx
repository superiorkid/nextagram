"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SlideNextButton from "./slide-next-button";
import SlidePrevButton from "./slide-prev-button";
import StoryView from "./story-view";

import "swiper/css";

interface Props {
  stories: Prisma.UserGetPayload<{
    include: {
      stories: true;
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
      {stories.map((author) => (
        <SwiperSlide className="p-1.5" key={author.id}>
          <StoryView story={author}>
            <div className="flex flex-col items-center space-y-2">
              <div className="relative w-14 h-14">
                <Image
                  fill
                  src={
                    author.image ??
                    `https://api.dicebear.com/7.x/micah/png?seed=${author.email}`
                  }
                  alt={`${author.name} profile photo`}
                  className="object-cover rounded-full ring-2 ring-pink-500 ring-offset-2 self-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <p className="text-xs">{author.name}</p>
            </div>
          </StoryView>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Stories;
