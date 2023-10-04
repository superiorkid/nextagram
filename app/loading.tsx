import React from "react";
import Image from "next/image";
import nextagramLogo from "@/public/assets/nextagram_logo.svg";

function Loading() {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="relative w-44 h-44 lg:w-[11dvw] lg:h-[22dvh] animation-pulse">
        <Image
          fill
          priority
          src={nextagramLogo}
          alt="nextagram logo"
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}

export default Loading;
