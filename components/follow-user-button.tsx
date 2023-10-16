"use client";

import React, { useTransition } from "react";
import { follow } from "@/_actions/user.action";
import { User } from "@prisma/client";
import toast from "react-hot-toast";

interface Props {
  user: User;
}

const FollowUserButton = ({ user }: Props) => {
  const [isPending, startTransition] = useTransition();

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
