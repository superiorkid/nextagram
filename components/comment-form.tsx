"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface Props {
  inputStyles?: string;
  buttonStyles?: string;
}

const CommentForm = ({ inputStyles, buttonStyles }: Props) => {
  const [comment, setComment] = useState<string>("");

  return (
    <form className="relative">
      <input
        placeholder="Add a comment..."
        className={cn("w-full pr-3 py-1 focus:outline-none", inputStyles)}
        onChange={(event) => setComment((comment) => event.target.value)}
      />
      <button
        className={cn(
          "absolute right-5 top-1/2 -translate-y-1/2 font-bold text-sky-500 hidden",
          comment.length && "flex"
        )}
      >
        Post
      </button>
    </form>
  );
};

export default CommentForm;
