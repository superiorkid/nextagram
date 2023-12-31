"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import fromNow from "@/lib/date-from-now";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useInView } from "react-intersection-observer";
import { viewStory } from "@/_actions/stories.action";

import "swiper/css";
import "swiper/css/effect-fade";
import { MergedData } from "@/typings";

interface Props {
  children: React.ReactNode;
  story: MergedData;
}

const StoryView = ({ story, children }: Props) => {
  const handleStoryView = async (storyId: string) => {
    await viewStory(storyId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-[95dvh] max-w-[502px] p-0 overflow-hidden">
        <Swiper
          autoplay
          spaceBetween={5}
          slidesPerView={1}
          modules={[EffectFade]}
          effect="fade"
          className="absolute top-0 left-0"
        >
          {story.stories.map((storyItem, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[95dvh] w-[502px]">
                <Image
                  fill
                  priority
                  src={storyItem.media_url}
                  alt={`${story.author.name} story ${index}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover brightness-90"
                  onLoad={async () => await handleStoryView(storyItem.id)}
                />
                {/* header */}
                <div className="absolute top-5 left-4 flex items-center space-x-2.5">
                  <div className="relative w-10 h-10">
                    <Image
                      fill
                      alt={`${story.author.name} profile picture`}
                      src={
                        story.author.image ??
                        `https://api.dicebear.com/7.x/micah/png?seed=${story.author.email}`
                      }
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover rounded-full"
                    />
                  </div>

                  <div className="text-sm font-light flex items-center space-x-3">
                    <Link href={`/${story.author.name}`}>
                      <h4 className="text-white tracking-wide">
                        {story.author.name}
                      </h4>
                    </Link>
                    <span
                      key={storyItem.id}
                      className="text-white opacity-75 text-xs hover:opacity-100 hover:cursor-default"
                    >
                      {fromNow(storyItem.postedAt.toString())}
                    </span>
                  </div>
                </div>
                {/*  footer or caption section */}
                <div className="absolute bottom-0 left-0 h-1/6 w-[502px] bg-opacity-30 bg-black items-center flex">
                  <p
                    className="text-gray-100 w-2/3 mx-auto text-center"
                    key={storyItem.id}
                  >
                    {storyItem.caption}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </DialogContent>
    </Dialog>
  );
};

export default StoryView;
