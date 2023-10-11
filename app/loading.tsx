import React from "react";
import Image from "next/image";
import nextagramLogo from "@/public/assets/nextagram_logo.svg";
import { FaHeart } from "react-icons/fa";

function Loading() {
  return (
    <div className="flex justify-center min-h-screen items-center relative">
      <div className="relative w-44 h-44 lg:w-[14dvw] lg:h-[22dvh] animate-pulse">
        <Image
          fill
          priority
          src={nextagramLogo}
          alt="nextagram logo"
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="absolute bottom-5">
        <p className="text-sm text-gray-400 font-medium tracking-wide">
          Made with <FaHeart className="h-4 w-4 fill-rose-400 inline-flex" /> by
          superiorkid
        </p>
      </div>
    </div>
  );
}

export default Loading;
