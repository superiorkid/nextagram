"use client";

import React, {
  useTransition,
  // @ts-ignore
  experimental_useOptimistic as useOptimistic,
} from "react";
import { follow } from "@/_actions/user.action";
import { Likes, Prisma, User } from "@prisma/client";
import toast from "react-hot-toast";

interface Props {
  user: Prisma.UserGetPayload<{
    include: { following: true; followers: true };
  }>;
  suggestedUsers: Prisma.UserGetPayload<{
    include: { following: true; followers: true };
  }>[];
}

const FollowUserButton = ({ user, suggestedUsers }: Props) => {
  const [isPending, startTransition] = useTransition();

  const [optimisticFollows, updateOptimisticFollows] = useOptimistic(
    suggestedUsers,
    (
      state: Prisma.UserGetPayload<{
        include: { following: true; followers: true };
      }>[],
      params: {}
    ) => {}
  );

  const handleFollow = () => {
    startTransition(async () => {
      await follow(user.id)
        .then(() => {
          toast.success(`Following ${user.name}`);
        })
        .catch(() => {
          console.log("something went wrong");
        });
    });
  };

  return (
    <button className="text-sm text-sky-500 font-bold" onClick={handleFollow}>
      Follow
    </button>
  );
};

export default FollowUserButton;
