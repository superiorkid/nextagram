"use client";

import { dislikePost, likePost } from "@/_actions/like.action";
import { Likes, User } from "@prisma/client";
import {
  useMemo,
  experimental_useOptimistic as useOptimistic,
  useTransition,
} from "react";
import {
  LiaBookmark,
  LiaHeart,
  LiaHeartSolid,
  LiaTelegram,
} from "react-icons/lia";
import { LuMessageCircle } from "react-icons/lu";

interface Props {
  currentUser: User | null;
  likes: Likes[];
  postId: string;
}

type Action = "like" | "dislike";

const ActionButtons = ({ currentUser, likes, postId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const [optimisticLikes, updateOptimisticLikes] = useOptimistic(
    likes,
    (state: Likes[], params: { postId: string; action: Action }) => {
      if (params.action === "like") {
        return [...state, { userId: currentUser?.id!, postId: params.postId }];
      } else if (params.action === "dislike") {
        return state.filter((file) => file.postId !== params.postId);
      } else {
        return state;
      }
    }
  );

  const likesArrayIncludeCurrentUser = useMemo(() => {
    return optimisticLikes.find((obj) =>
      obj["userId"].includes(currentUser?.id!)
    );
  }, [currentUser?.id, optimisticLikes]);

  const handleLikeAction = (postId: string, action: Action) => {
    startTransition(async () => {
      if (action === "like") {
        updateOptimisticLikes({ postId, action: "like" });
        await likePost(postId);
      } else {
        updateOptimisticLikes({ postId, action: "dislike" });
        await dislikePost(postId);
      }
    });
  };

  return (
    <div className="flex items-center justify-between my-2">
      <div className="flex space-x-3.5">
        <button
          aria-label="like action"
          className="hover:text-gray-500"
          onClick={() => {
            likesArrayIncludeCurrentUser
              ? handleLikeAction(postId, "dislike")
              : handleLikeAction(postId, "like");
          }}
        >
          {likesArrayIncludeCurrentUser ? (
            <LiaHeartSolid className="w-7 h-7 fill-rose-500 hover:fill-rose-600 transition-all duration-400" />
          ) : (
            <LiaHeart className="w-7 h-7 hover:fill-gray-100 transition-all duration-400" />
          )}
        </button>
        <button aria-label="comment action" className="hover:text-gray-500">
          <LuMessageCircle className="w-7 h-7" />
        </button>
        <button aria-label="share action" className="hover:text-gray-500">
          <LiaTelegram className="w-7 h-7" />
        </button>
      </div>
      <button aria-label="bookmark action" className="hover:text-gray-500">
        <LiaBookmark className="w-7 h-7" />
      </button>
    </div>
  );
};

export default ActionButtons;
