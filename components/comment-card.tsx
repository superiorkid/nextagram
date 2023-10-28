import React from "react";
import Image from "next/image";
import Link from "next/link";
import fromNow from "@/lib/date-from-now";
import CommentLikeButton from "@/components/comment-like-button";
import { Prisma, User } from "@prisma/client";

interface Props {
  currentUser: User | null;
  comment: Prisma.CommentsGetPayload<{
    include: {
      user: true;
      commentLikes: true;
      _count: {
        select: {
          commentLikes: true;
        };
      };
    };
  }>;
}

function CommentCard({ comment, currentUser }: Props) {
  return (
    <div className="flex space-x-4">
      <div>
        <div className="relative h-8 w-8">
          <Image
            fill
            src={
              comment.user.image ??
              `https://api.dicebear.com/7.x/micah/png?seed=${comment.user.email}`
            }
            alt={`${comment.user.name} profile`}
            className="object-cover rounded-full ring-2 ring-offset-1 ring-pink-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div>
        <p className="text-sm font-extralight leading-snug">
          <Link href={`/${comment.user.name}`} className="font-bold mr-2">
            {comment.user.name}
          </Link>
          {comment.content}
        </p>
        <div className="mt-1.5 text-xs flex space-x-3 items-center">
          <time className=" text-gray-600">{fromNow(comment.postedAt)}</time>
          <CommentLikeButton comment={comment} currentUser={currentUser} />

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
  );
}

export default CommentCard;
