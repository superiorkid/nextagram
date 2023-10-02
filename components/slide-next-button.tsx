"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useSwiper } from "swiper/react";
import { IoIosArrowDropright } from "react-icons/io";

interface Props {
  className?: string;
}

export default function SlideNextButton({ className }: Props) {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slideNext()}
      className={cn(`${className} opacity-50 hover:opacity-100`)}
      aria-label="next slide button"
    >
      <IoIosArrowDropright className="w-6 h-6" />
    </button>
  );
}
