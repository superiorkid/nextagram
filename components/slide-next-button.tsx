"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useSwiper } from "swiper/react";
import { IoIosArrowDropright } from "react-icons/io";

interface Props {
  className?: string;
  iconSize?: string;
}

export default function SlideNextButton({ className, iconSize = "6" }: Props) {
  const swiper = useSwiper();

  return (
    <button
      type="button"
      onClick={() => swiper.slideNext()}
      className={cn(`${className} opacity-50 hover:opacity-100`)}
      aria-label="next slide button"
    >
      <IoIosArrowDropright className={`w-${iconSize} h-${iconSize}`} />
    </button>
  );
}
