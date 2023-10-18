import React from "react";
import Image from "next/image";
import { Prisma, User } from "@prisma/client";
import { BsGearWide } from "react-icons/bs";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";

interface Props {
  user: Prisma.UserGetPayload<{
    include: {
      posts: {
        include: {
          author: true;
          images: true;
          commentedByUsers: {
            include: {
              user: true;
            };
          };
          likedByUsers: true;
          _count: {
            select: {
              likedByUsers: true;
              commentedByUsers: true;
            };
          };
        };
      };
      followers: true;
      following: true;
      _count: {
        select: {
          posts: true;
          following: true;
          followers: true;
        };
      };
    };
  }> | null;
}

const ProfileHeader = ({ user }: Props) => {
  return (
    <section className="max-w-screen-md mx-auto flex space-x-20">
      <div className="relative h-28 w-28">
        {user?.image ? (
          <Image
            fill
            src={user.image as string}
            alt={`${user.name} profile picture`}
            className="object-cover rounded-full ring-2 ring-offset-2 ring-pink-400"
          />
        ) : (
          <RxAvatar className="w-28 h-28" />
        )}
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-10 items-center">
          <p className="font-medium text-lg">{user?.name}</p>
          <Link
            href="/settings/profile"
            className="font-black tracking-wide bg-gray-100 px-2 py-1 text-sm rounded-lg"
          >
            Edit profile
          </Link>
          <button type="button">
            <BsGearWide className="w-6 h-6 fill-gray-700" />
          </button>
        </div>
        <div className="flex space-x-10 items-center">
          <p>
            <span className="font-bold">{user?._count.posts}</span> post
            {user?._count.posts! > 1 && "s"}
          </p>
          <p>
            <span className="font-bold">{user?._count.followers}</span>{" "}
            followers
          </p>
          <p>
            <span className="font-bold">{user?._count.following}</span>{" "}
            following
          </p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-sm">{user?.fullName ?? user?.name}</p>
          <p className="text-sm font-light break-words">{user?.bio}</p>
        </div>
        <p className="text-xs font-extralight text-gray-500">
          Followed by windha.az, armndhan + 9 more
        </p>
      </div>
    </section>
  );
};

export default ProfileHeader;
