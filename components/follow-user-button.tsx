"use client";

import React, { useTransition } from "react";
import { follow, unfollow } from "@/_actions/user.action";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface Props {
  user: User;
  isFollowing: boolean;
  followBtnStyle?: string;
  unfollowBtnStyle?: string;
}

const FollowUserButton = ({
  user,
  isFollowing,
  unfollowBtnStyle,
  followBtnStyle,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(async () => {
      if (isFollowing) {
        await unfollow(user.id)
          .then(() => {
            toast.success(`Unfollow ${user.name}`);
          })
          .catch(() => {
            console.log("something went wrong");
          });
      } else {
        await follow(user.id)
          .then(() => {
            toast.success(`Following ${user.name}`);
          })
          .catch(() => {
            console.log("something went wrong");
          });
      }
    });
  };

  return (
    <button
      className={cn(
        `text-sm text-sky-500 font-bold`,
        isFollowing ? `${unfollowBtnStyle}` : `${followBtnStyle}`
      )}
      onClick={handleFollow}
    >
      {isFollowing ? "unfollow" : "follow"}
    </button>
  );
};

export default FollowUserButton;
