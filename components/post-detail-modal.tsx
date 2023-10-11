import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Prisma, User } from "@prisma/client";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import ActionButtons from "./action-buttons";
import CommentForm from "./comment-form";
import { Separator } from "./ui/separator";
import { useDetailPostDialogContext } from "@/context/detail-post-dialog-ctx";

interface Props {
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

const PostDetailModal = ({ currentUser, post }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="block text-gray-500 outline-none">
          {post._count.commentedByUsers < 1
            ? "View Post"
            : post._count.commentedByUsers === 1
            ? "View Comment"
            : `View all ${post._count.commentedByUsers} comments`}
        </button>
      </DialogTrigger>

      <DialogContent className="outline-none max-w-[80dvw] p-0 overflow-hidden">
        <div className="overflow-clip">
          <div className="flex max-h-[90dvh] overflow-auto min-w-0">
            <div className="flex-1 overflow-hidden">
              {/* <div className="">
                <ImageModalPreview images={post.images} />
              </div> */}
              <div className="relative h-[90dvh]">
                <Image
                  fill
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1968&q=80"
                  alt="image example"
                  className="object-cover"
                  quality={75}
                />
              </div>
            </div>

            <div className="w-[22dvw] flex flex-col justify-between z-50">
              <div className="flex-1 overflow-auto">
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
                        {moment(post?.createdAt.toLocaleString()).fromNow()}
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
                                  {moment(
                                    comment.postedAt.toLocaleString()
                                  ).fromNow()}
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
                  <p className="font-bold text-sm tracking-wide">399 likes</p>
                  <p className="text-xs text-gray-600 font-medium tracking-wide">
                    2 HOURS AGO
                  </p>
                </div>

                <div className="border-t py-2.5 px-2">
                  <CommentForm />
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
