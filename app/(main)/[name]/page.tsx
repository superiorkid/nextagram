import { getUser, followingStatus } from "@/_actions/user.action";
import Container from "@/components/container";
import ProfileHeader from "@/components/profile-header";
import Image from "next/image";
import { FaComment, FaHeart, FaImages } from "react-icons/fa6";
import { MdGridOn } from "react-icons/md";
import prisma from "@/lib/prisma";
import React from "react";
import getCurrentUser from "@/_actions/get-current-user";
import PostDetailModal from "@/components/post-detail-modal";
import { notFound } from "next/navigation";
import LockedAccount from "@/components/locked-account";
import { PiLockKeyDuotone } from "react-icons/pi";

interface Props {
  params: {
    name: string;
  };
}

export async function generateStaticParams() {
  const users = await prisma.user.findMany();

  return users.map((user) => ({
    name: user.name,
  }));
}

async function UserDetailPage({ params: { name } }: Props) {
  const currentUser = await getCurrentUser();
  const user = await getUser(name);
  const isFollowing = await followingStatus(user?.id as string);

  if (!user) {
    notFound();
  }

  const lockedAccount = user?.private && !isFollowing;

  return (
    <Container className="max-w-screen-lg lg:px-3 pt-0 lg:pt-7 pb-6 min-h-screen">
      <ProfileHeader
        user={user}
        isFollowing={isFollowing}
        isCurrentUser={currentUser?.id === user.id}
      />

      {lockedAccount ? (
        <LockedAccount />
      ) : (
        <React.Fragment>
          <section className="flex flex-wrap overflow-auto space-x-12 p-2 my-12 max-w-4xl mx-auto">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="flex flex-col items-center space-y-2" key={index}>
                <div className="w-16 h-16 rounded-full bg-sky-500 ring-2 ring-offset-2 ring-pink-500" />
                <p className="text-xs font-bold">Story {index}</p>
              </div>
            ))}
          </section>

          <section className="border-t-2 border-gray-300">
            <div className="flex justify-center">
              <h2 className="shadow-sm font-bold uppercase text-sm tracking-wide py-3">
                <MdGridOn className="w-4 h-4 inline self-center mr-0.5" />
                Posts
              </h2>
            </div>
            {user.posts.length < 1 ? (
              <div className="mt-20">
                <div className="flex justify-center flex-col items-center space-y-3.5">
                  <div className="p-5 border-[3px] border-black rounded-full">
                    <PiLockKeyDuotone className="w-10 h-10" />
                  </div>
                  <p className="text-2xl font-semibold capitalize tracking-wider">
                    no posts yet
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {user.posts.map((post, index) => (
                  <PostDetailModal
                    currentUser={currentUser}
                    post={post}
                    key={index}
                  >
                    <div className="bg-rose-200 aspect-square relative group">
                      <Image
                        fill
                        src={post.images.at(0)?.path as string}
                        alt={`${post.images.at(0)?.name} image`}
                        className="object-cover group-hover:brightness-50 hover:cursor-pointer rounded-sm"
                        quality={75}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:space-x-5 hidden group-hover:flex transition-all duration-500">
                        <div className="flex flex-col items-center space-y-1 text-white">
                          <FaHeart className="w-6 h-6 fill-white" />
                          <p>{post._count.likedByUsers}</p>
                        </div>
                        <div className="flex flex-col items-center space-y-1 text-white">
                          <FaComment className="w-6 h-6 fill-white" />
                          <p>{post._count.commentedByUsers}</p>
                        </div>
                      </div>

                      {post.images.length > 1 && (
                        <div className="absolute top-5 right-5 text-white">
                          <FaImages className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </PostDetailModal>
                ))}
              </div>
            )}
          </section>
        </React.Fragment>
      )}
    </Container>
  );
}

export default UserDetailPage;