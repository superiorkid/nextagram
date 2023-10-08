import Container from "@/components/container";
import Footer from "@/components/footer";
import PostCard from "@/components/post-card";
import Stories from "@/components/stories";
import UserCard from "@/components/user-card";
import Image from "next/image";
import Link from "next/link";
import getCurrentUser from "@/_actions/get-current-user";
import { RxAvatar } from "react-icons/rx";
import React from "react";
import { getSuggestedUsers } from "@/_actions/user.action";
import Logo from "@/components/logo";
import { getPosts } from "@/_actions/post.action";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const suggestedUsers = await getSuggestedUsers();
  const posts = await getPosts();

  return (
    <Container className="max-w-screen-lg lg:px-3 pt-0 lg:pt-12 pb-6">
      <div className="min-h-screen flex justify-between space-x-14 flex-nowrap">
        <div className="flex-1 min-w-0 overflow-auto">
          {/*mobile header*/}
          <div className="my-6 lg:hidden">
            <Logo className="h-[7dvh]" />
          </div>
          <Stories />
          <div className="max-w-md mx-auto space-y-5 divide-y-2">
            {posts.map((post, index) => (
              <PostCard post={post} key={index} />
            ))}
          </div>
        </div>

        <div className="w-72 hidden lg:flex lg:flex-col pt-3">
          <div className="flex space-x-2.5 mb-6">
            {currentUser?.image ? (
              <div className="w-12 h-12 relative">
                <Image
                  fill
                  src={currentUser.image}
                  alt={`${currentUser.name} photo`}
                  className="object-cover rounded-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <RxAvatar className="w-12 h-12" />
            )}
            <div className="text-sm">
              <p className="font-bold tracking-wide">{currentUser?.name}</p>
              <p className="text-gray-500">{currentUser?.email}</p>
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
      </div>
      <Footer />
    </Container>
  );
}
