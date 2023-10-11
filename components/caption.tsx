"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface Props {
  name: string;
  caption: string;
}

const Caption = ({ name, caption }: Props) => {
  const [seeMore, setSeeMore] = useState<boolean>(false);

  const handleSeeMore = () => {
    setSeeMore((seeMore) => !seeMore);
  };

  return (
    <React.Fragment>
      <p className={cn("text-balance", !seeMore && "line-clamp-1")}>
        <span className="font-bold mr-2">{name}</span>
        {caption}
      </p>
      <button
        className={cn("text-gray-400 hover:text-gray-500", seeMore && "hidden")}
        onClick={handleSeeMore}
      >
        more
      </button>
    </React.Fragment>
  );
};

export default Caption;
