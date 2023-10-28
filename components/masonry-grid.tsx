"use client";

import React from "react";
import { Prisma, User } from "@prisma/client";
import Image from "next/image";
import { FaComment, FaHeart } from "react-icons/fa";
import { FaImages } from "react-icons/fa6";
import { Masonry } from "react-plock";
import PostDetailModal from "./post-detail-modal";

interface Props {
  posts: Prisma.PostGetPayload<{
    include: {
      images: true;
      author: true;
      likedByUsers: true;
      commentedByUsers: {
        include: {
          user: true;
          commentLikes: true;
          _count: {
            select: {
              commentLikes: true;
            };
          };
        };
      };
      _count: {
        select: { likedByUsers: true; commentedByUsers: true };
      };
    };
  }>[];
  currentUser: User | null;
}

function MasonryGrid({ posts, currentUser }: Props) {
  return (
    <Masonry
      items={posts}
      config={{
        columns: [1, 2, 3],
        gap: [24, 12, 6],
        media: [640, 768, 1024],
      }}
      render={(post, idx) => (
        <PostDetailModal currentUser={currentUser} post={post}>
          <div className="group hover:cursor-pointer relative overflow-hidden">
            <Image
              width={500}
              height={500}
              src={post.images.at(0)?.path as string}
              alt="post image"
              className="object-contain group-hover:brightness-50 h-auto w-full group-hover:scale-105"
              quality={75}
            />
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:flex space-x-5 text-white`}
            >
              <div className="flex flex-col items-center space-y-1">
                <FaHeart className="w-6 h-6" />
                <p>{post._count.likedByUsers}</p>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <FaComment className="w-6 h-6" />
                <p>{post._count.commentedByUsers}</p>
              </div>
            </div>

            {post.images.length > 1 && (
              <div className="absolute top-5 right-5 text-white">
                <FaImages className="w-6 h-6" />
              </div>
            )}
          </div>
        </PostDetailModal>
      )}
    />
  );
}

export default MasonryGrid;
