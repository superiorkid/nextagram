import { Prisma, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import FollowUserButton from "./follow-user-button";
import generateAvatar from "@/lib/generate-avatar";

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
  isFollowing: boolean;
  isCurrentUser: boolean;
}

const ProfileHeader = ({ user, isFollowing, isCurrentUser }: Props) => {
  return (
    <section className="max-w-screen-md mx-auto flex space-x-20">
      <div className="relative h-28 w-28">
        <Image
          fill
          src={user?.image ?? generateAvatar(user?.email as string)}
          alt={`${user?.name} profile picture`}
          className="object-cover rounded-full ring-2 ring-offset-2 ring-pink-400"
        />
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex space-x-10 items-center">
          <p className="font-medium text-lg">{user?.name}</p>
          {isCurrentUser && (
            <Link
              href="/settings/profile"
              className="font-black tracking-wide bg-gray-100 px-2 py-1 text-sm rounded-lg"
            >
              Edit profile
            </Link>
          )}

          {!isCurrentUser && (
            <FollowUserButton
              user={user as User}
              isFollowing={isFollowing}
              unfollowBtnStyle="py-1 bg-gray-200 text-gray-800 font-bold tracking-wide capitalize px-5 rounded-md"
              followBtnStyle="py-1 bg-sky-400 text-white font-bold tracking-wide capitalize px-5 rounded-md"
            />
          )}
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
