"use client";

import React, { useMemo, useOptimistic, useTransition } from "react";
import { commentDislike, commentLike } from "@/_actions/comment.action";
import { CommentLikes, Prisma, User } from "@prisma/client";
import { cn } from "@/lib/utils";

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

type Action = "like" | "dislike";

function CommentLikeButton({ comment, currentUser }: Props) {
  const [isPending, startTransition] = useTransition();

  const [optimisticLikes, updateOptimisticLikes] = useOptimistic<
    CommentLikes[]
    // @ts-ignore
  >(comment.commentLikes, (state: CommentLikes[], action: Action) => {
    if (action === "like") {
      return [...state, { userId: currentUser?.id, commentId: comment.id }];
    } else if (action === "dislike") {
      return state.filter((data) => data.userId !== currentUser?.id);
    } else {
      return state;
    }
  });

  const isCommentLikedByCurrentUser = useMemo(() => {
    return optimisticLikes.some((data) => data.userId === currentUser?.id);
  }, [currentUser?.id, optimisticLikes]);

  const handleLikeComment = () => {
    startTransition(async () => {
      if (isCommentLikedByCurrentUser) {
        updateOptimisticLikes("dislike");
        commentDislike(comment.id);
      } else {
        updateOptimisticLikes("like");
        commentLike(comment.id);
      }
    });
  };

  return (
    <button
      type="button"
      aria-label="like button"
      aria-labelledby="like button"
      className={cn(
        "font-bold tracking-wide",
        isCommentLikedByCurrentUser && "text-rose-500"
      )}
      onClick={handleLikeComment}
    >
      <span className="sr-only">like button</span>
      {optimisticLikes.length} {optimisticLikes.length < 2 ? "like" : "likes"}
    </button>
  );
}

export default CommentLikeButton;
