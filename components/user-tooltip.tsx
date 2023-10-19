import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";

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

function UserTooltip({ children, user }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="min-w-[22dvw] py-5">
          <div className="flex items-center space-x-4">
            {user.image ? (
              <div className="relative h-14 w-14">
                <Image
                  fill
                  src={user.image}
                  alt={`${user.name} photo`}
                  className="object-cover rounded-full"
                />
              </div>
            ) : (
              <RxAvatar className="w-14 h-14 inline mr-2.5" />
            )}
            <div className="leading-tight">
              <p className="font-bold text-base">
                {user.fullName ?? user?.name}
              </p>
              <p className="font-extralight text-sm">{user?.name}</p>
            </div>
          </div>

          <div className="flex space-x-10 items-center my-7 justify-between px-10">
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
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default UserTooltip;
