import React from "react";
import Image from "next/image";
import { GoKebabHorizontal } from "react-icons/go";
import ActionButtons from "./action-buttons";
import Caption from "./caption";
import CommentForm from "./comment-form";

const PostCard = () => {
  return (
    <div className="min-h-[68dvh] flex flex-col justify-between pt-3.5 first:pt-0">
      {/* head */}
      <div className="flex justify-between items-center mb-3 px-2 md:px-0">
        <div className="flex items-center space-x-3">
          <div className="relative h-9 w-9">
            <Image
              fill
              src="https://images.unsplash.com/photo-1521856729154-7118f7181af9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80"
              alt="profile pic"
              className="rounded-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <p className="text-sm font-bold tracking-wide">
            hanifamr_ <span className="text-gray-400">• 31m</span>
          </p>
        </div>
        <button>
          <GoKebabHorizontal />
        </button>
      </div>

      {/* content */}
      <div className="flex-1">
        <div className="relative h-[507px] bg-black">
          <Image
            fill
            src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            alt="post photo"
            className="object-contain rounded-sm"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="text-sm px-2 md:px-0">
          <ActionButtons />
          <div className="space-y-0.5">
            <p className="font-bold tracking-wide">352 likes</p>
            <Caption />
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="mt-1 text-sm space-y-1 px-2 md:px-0">
        <button className="block text-gray-500">View all 8 comments</button>
        <CommentForm />
      </div>
    </div>
  );
};

export default PostCard;
