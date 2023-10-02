"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useSwiper } from "swiper/react";
import { IoIosArrowDropleft } from "react-icons/io";

interface Props {
  className?: string;
}

export default function SlidePrevButton({ className }: Props) {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slidePrev()}
      className={cn(`${className} opacity-50 hover:opacity-100`)}
      aria-label="previous slide button"
    >
      <IoIosArrowDropleft className="w-6 h-6" />
    </button>
  );
}
