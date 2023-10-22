import React from "react";
import Image from "next/image";
import { Prisma, User } from "@prisma/client";
import { RxAvatar } from "react-icons/rx";
import FollowUserButton from "./follow-user-button";
import Link from "next/link";
import UserTooltip from "./user-tooltip";
import { followingStatus } from "@/_actions/user.action";

interface Props {
  user: Prisma.UserGetPayload<{
    include: {
      posts: {
        include: {
          images: true;
        };
      };
      followers: true;
      following: true;
      _count: {
        select: {
          posts: true;
          followers: true;
          following: true;
        };
      };
    };
  }>;
}

const UserCard = async ({ user }: Props) => {
  const isFollowing = await followingStatus(user.id);

  return (
    <div className="flex justify-between items-center">
      <UserTooltip user={user}>
        <div className="flex space-x-2.5 items-center">
          {user.image ? (
            <div className="relative w-12 h-12">
              <Image
                fill
                src={user?.image!}
                alt="profile photo"
                className="object-cover rounded-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <RxAvatar className="w-12 h-12" />
          )}

          <div className="text-sm">
            <Link href={`/${user.name}`} className="font-bold tracking-wide">
              {user.name}
            </Link>
            <p className="text-gray-500 text-xs">Followed by _danu.ar</p>
          </div>
        </div>
      </UserTooltip>

      <FollowUserButton user={user} isFollowing={isFollowing} />
    </div>
  );
};

export default UserCard;
