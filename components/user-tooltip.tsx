import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { followingStatus } from "@/_actions/user.action";
import { cn } from "@/lib/utils";
import { FaCameraRetro } from "react-icons/fa";
import { PiLockKeyDuotone } from "react-icons/pi";
import FollowUserButton from "./follow-user-button";
import generateAvatar from "@/lib/generate-avatar";

interface Props {
  children: React.ReactNode;
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

async function UserTooltip({ children, user }: Props) {
  const isFollowing = await followingStatus(user.id);

  const lockedAccount = user?.private && !isFollowing;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="min-w-[22dvw] py-2">
          <div className="flex items-center space-x-4">
            <div className="relative h-14 w-14">
              <Image
                fill
                src={user.image ?? generateAvatar(user.email as string)}
                alt={`${user.name} photo`}
                className="object-cover rounded-full"
              />
            </div>

            <div className="leading-tight">
              <p className="font-bold text-base">
                {user.fullName ?? user?.name}
              </p>
              <p className="font-extralight text-sm">{user?.name}</p>
            </div>
          </div>

          <div
            className={cn(
              "flex space-x-10 items-center mt-7 mb-3 justify-between px-10"
            )}
          >
            <p>
              <span className="font-bold">{user._count.posts}</span> posts
            </p>
            <p>
              <span className="font-bold">{user._count.followers}</span>{" "}
              followers
            </p>
            <p>
              <span className="font-bold">{user._count.following}</span>{" "}
              following
            </p>
          </div>

          {user.posts.length < 1 ? (
            <React.Fragment>
              <div className="border-y-2 py-4">
                <div className="flex flex-col items-center space-y-1.5">
                  <FaCameraRetro className="w-8 h-8 fill-pink-500" />
                  <div className="text-center max-w-[280px]">
                    <h3 className="font-bold text-lg">No posts yet</h3>
                    <p className="text-gray-600 font-light">
                      when {user.name} shares photos, you{"'"}ll see them here.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <FollowUserButton
                  user={user}
                  isFollowing={isFollowing}
                  followBtnStyle="bg-sky-400 text-white w-full py-2 rounded-md capitalize tracking-wide"
                />
              </div>
            </React.Fragment>
          ) : lockedAccount ? (
            <React.Fragment>
              <div className="border-y-2 py-4">
                <div className="flex flex-col items-center space-y-1.5">
                  <PiLockKeyDuotone className="w-8 h-8 fill-pink-500" />
                  <div className="text-center max-w-[280px]">
                    <h3 className="font-bold text-lg">
                      This account is private
                    </h3>
                    <p className="text-gray-600 font-light">
                      Follow this account to see their photos.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <FollowUserButton
                  user={user}
                  isFollowing={isFollowing}
                  followBtnStyle="bg-sky-400 text-white w-full py-2 rounded-md capitalize tracking-wide"
                />
              </div>
            </React.Fragment>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {user.posts.slice(0, 3).map((post, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    fill
                    src={post.images.at(0)?.path as string}
                    alt={`${post.images.at(0)?.name} profile`}
                    className="object-cover"
                    quality={75}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default UserTooltip;
