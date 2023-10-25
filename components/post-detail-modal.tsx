import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import fromNow from "@/lib/date-from-now";
import { Prisma, User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import ActionButtons from "./action-buttons";
import CommentForm from "./comment-form";
import { Separator } from "./ui/separator";
import ImageModalPreview from "./image-modal-preview";
import Link from "next/link";
import generateAvatar from "@/lib/generate-avatar";

interface Props {
  children: React.ReactNode;
  currentUser: User | null;
  post: Prisma.PostGetPayload<{
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
  }>;
}

const PostDetailModal = ({ currentUser, post, children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

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
                    <div className="relative h-8 w-8">
                      <Image
                        fill
                        src={
                          post.author?.image ??
                          generateAvatar(post.author?.email as string)
                        }
                        alt={`${post.author?.name} profile`}
                        className="object-cover rounded-full ring-2 ring-offset-1 ring-pink-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="leading-tight">
                      <Link
                        href={`/${post.author?.name}`}
                        className="text-sm font-bold tracking-wide"
                      >
                        {post.author?.name}
                      </Link>
                      {post.location && (
                        <p className="text-sm text-gray-500">{post.location}</p>
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
                      <div className="relative h-8 w-8">
                        <Image
                          fill
                          src={
                            post.author?.image ??
                            generateAvatar(post.author?.email as string)
                          }
                          alt={`${post.author?.name} profile`}
                          className="object-cover rounded-full ring-2 ring-offset-1 ring-pink-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                    <div className="w-full leading-tight">
                      <p className="text-sm font-extralight leading-snug">
                        <Link
                          href={`/${post.author?.name}`}
                          className="font-bold mr-2"
                        >
                          {post.author?.name}
                        </Link>
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
                              <div className="relative h-8 w-8">
                                <Image
                                  fill
                                  src={
                                    comment.user.image ??
                                    generateAvatar(
                                      comment.user?.email as string
                                    )
                                  }
                                  alt={`${comment.user.name} profile`}
                                  className="object-cover rounded-full ring-2 ring-offset-1 ring-pink-300"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-extralight leading-snug">
                                <Link
                                  href={`/${comment.user.name}`}
                                  className="font-bold mr-2"
                                >
                                  {comment.user.name}
                                </Link>
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
                                  <span className="sr-only">like button</span>2
                                  likes
                                </button>

                                <button
                                  type="button"
                                  aria-label="like button"
                                  aria-labelledby="like button"
                                  className="font-bold tracking-wide"
                                >
                                  <span className="sr-only">reply button</span>
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
  );
};

export default PostDetailModal;
