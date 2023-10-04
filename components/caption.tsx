"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

const Caption = () => {
  const [seeMore, setSeeMore] = useState<boolean>(false);

  const handleSeeMore = () => {
    setSeeMore((seeMore) => !seeMore);
  };

  return (
    <React.Fragment>
      <p className={cn("[text-wrap:balance]", !seeMore && "line-clamp-1")}>
        <span className="font-bold mr-2">hanifamr_</span>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam quas,
        facilis suscipit iure, natus nulla fugiat eligendi tempora aut
        praesentium rerum consectetur, mollitia provident nisi recusandae
        reiciendis? Dicta rerum id nihil porro odit consequuntur sequi sapiente,
        eum dolor repellat quibusdam.
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
