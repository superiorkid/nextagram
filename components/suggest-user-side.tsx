import React from "react";
import Link from "next/link";
import UserCard from "@/components/user-card";
import { Prisma, User } from "@prisma/client";
import Image from "next/image";

interface Props {
  currentUser: User | null;
  suggestedUsers: Prisma.UserGetPayload<{
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
  }>[];
}

function SuggestUserSide({ suggestedUsers, currentUser }: Props) {
  return (
    <div className="w-72 hidden lg:flex lg:flex-col pt-3">
      <div className="flex space-x-2.5 mb-6">
        <div className="w-12 h-12 relative">
          <Image
            fill
            src={
              currentUser?.image ??
              `https://api.dicebear.com/7.x/micah/png?seed=${currentUser?.email}`
            }
            alt={`${currentUser?.name} photo`}
            className="object-cover rounded-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="text-sm">
          <p className="font-bold tracking-wide">{currentUser?.name}</p>
          <p className="text-gray-500 dark:text-gray-400">
            {currentUser?.email}
          </p>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-sm tracking-wide text-gray-500">
            Suggested for you
          </h4>
          <Link
            href="#seeall"
            className="text-xs font-bold tracking-wide hover:underline"
          >
            See all
          </Link>
        </div>

        <div className="space-y-3.5">
          {suggestedUsers.map((user, index) => (
            <UserCard user={user} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SuggestUserSide;
