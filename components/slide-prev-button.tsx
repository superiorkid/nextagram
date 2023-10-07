"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useSwiper } from "swiper/react";
import { IoIosArrowDropleft } from "react-icons/io";

interface Props {
  className?: string;
  iconSize?: string;
}

export default function SlidePrevButton({ className, iconSize = "6" }: Props) {
  const swiper = useSwiper();

  return (
    <button
      type="button"
      onClick={() => swiper.slidePrev()}
      className={cn(`${className} opacity-50 hover:opacity-100`)}
      aria-label="previous slide button"
    >
      <IoIosArrowDropleft className={`w-${iconSize} h-${iconSize}`} />
    </button>
  );
}
