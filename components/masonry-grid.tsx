"use client";

import React from "react";
import { Prisma, User } from "@prisma/client";
import Image from "next/image";
import { FaComment, FaHeart } from "react-icons/fa";
import { FaImages } from "react-icons/fa6";
import { Masonry } from "react-plock";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RxAvatar } from "react-icons/rx";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { Separator } from "@/components/ui/separator";
import ActionButtons from "@/components/action-buttons";
import CommentForm from "@/components/comment-form";
import fromNow from "@/lib/date-from-now";
import ImageModalPreview from "./image-modal-preview";

interface Props {
  posts: Prisma.PostGetPayload<{
    include: {
      images: true;
      author: true;
      likedByUsers: true;
      commentedByUsers: {
        include: { user: true };
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
        <Dialog>
          <DialogTrigger asChild>
            <div className="group hover:cursor-pointer relative overflow-hidden">
              <Image
                width={500}
                height={500}
                src={post.images.at(0)?.path.replace("public", "")!}
                alt="post image"
                className="object-contain group-hover:brightness-50 h-auto w-full group-hover:scale-105"
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
          </DialogTrigger>

          <DialogContent className="outline-none max-w-[80dvw] p-0 overflow-hidden">
            <div className="overflow-auto">
              <div className="flex max-h-[90dvh] min-w-0">
                <div className="flex-1 min-w-0 overflow-auto">
                  <ImageModalPreview images={post.images} />
                </div>

                <div className="w-[22dvw] flex flex-col justify-between overflow-auto">
                  <div className="flex-1">
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex space-x-3 items-center">
                        {post?.author?.image ? (
                          <div className="relative h-8 w-8">
                            <Image
                              fill
                              src={post.author?.image}
                              alt={`${post.author.name} profile`}
                              className="object-cover rounded-full ring-2 ring-offset-1 ring-pink-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        ) : (
                          <RxAvatar className="w-8 h-8 inline" />
                        )}
                        <div className="leading-tight">
                          <p className="text-sm font-bold tracking-wide">
                            {post?.author?.name}
                          </p>
                          {post.location && (
                            <p className="text-sm text-gray-500">
                              {post.location}
                            </p>
                          )}
                        </div>
                      </div>
                      <button type="button">
                        <PiDotsThreeOutlineFill className="w-4 h-4" />
                      </button>
                    </div>

                    <Separator />

                    {/* caption & comments here */}
                    <div className="p-4 overflow-auto">
                      <div className="flex space-x-4 mb-4">
                        <div>
                          {post?.author?.image ? (
                            <div className="relative h-8 w-8">
                              <Image
                                fill
                                src={post.author?.image}
                                alt={`${post.author.name} profile`}
                                className="object-cover rounded-full ring-2 ring-offset-1 ring-pink-300"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            </div>
                          ) : (
                            <RxAvatar className="w-8 h-8 inline" />
                          )}
                        </div>
                        <div className="w-full leading-tight">
                          <p className="text-sm font-extralight leading-snug">
                            <span className="font-bold mr-2">
                              {post?.author?.name}
                            </span>
                            {post?.caption}
                          </p>
                          <p className="mt-1.5 text-xs text-gray-600">
                            {fromNow(post.createdAt)}
                          </p>
                        </div>
                      </div>

                      {/* comments */}
                      <div className="space-y-3">
                        {post?.commentedByUsers.map((comment, index) => {
                          return (
                            <React.Fragment key={index}>
                              <div className="flex space-x-4">
                                <div>
                                  {comment.user.image ? (
                                    <div className="relative h-8 w-8">
                                      <Image
                                        fill
                                        src={comment.user.image}
                                        alt={`${comment.user.name} profile`}
                                        className="object-cover rounded-full ring-2 ring-offset-1 ring-pink-300"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                      />
                                    </div>
                                  ) : (
                                    <RxAvatar className="w-8 h-8 inline" />
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-extralight leading-snug">
                                    <span className="font-bold mr-2">
                                      {comment.user.name}
                                    </span>
                                    {comment.content}
                                  </p>
                                  <div className="mt-1.5 text-xs flex space-x-3 items-center">
                                    <time className=" text-gray-600">
                                      {fromNow(comment.postedAt)}
                                    </time>
                                    <button
                                      type="button"
                                      aria-label="like button"
                                      aria-labelledby="like button"
                                      className="font-bold tracking-wide"
                                    >
                                      <span className="sr-only">
                                        like button
                                      </span>
                                      2 likes
                                    </button>

                                    <button
                                      type="button"
                                      aria-label="like button"
                                      aria-labelledby="like button"
                                      className="font-bold tracking-wide"
                                    >
                                      <span className="sr-only">
                                        reply button
                                      </span>
                                      reply
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* right bottom content */}
                  <div className="min-h-[12dvh] border-t shadow-sm">
                    <div className="px-4 mb-3 mt-4">
                      <ActionButtons
                        currentUser={currentUser}
                        likes={post?.likedByUsers!}
                        postId={post?.id!}
                        iconSize="7"
                      />
                    </div>
                    <div className="px-4 leading-tight mb-4">
                      <p className="font-bold te  xt-sm tracking-wide">
                        {post._count.likedByUsers} like
                        {post._count.likedByUsers > 1 && "s"}
                      </p>
                      <p className="text-xs text-gray-600 font-medium tracking-wide">
                        2 HOURS AGO
                      </p>
                    </div>

                    <div className="border-t py-2.5 px-2">
                      <CommentForm postId={post.id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    />
  );
}

export default MasonryGrid;
