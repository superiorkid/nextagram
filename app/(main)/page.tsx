import getCurrentUser from "@/_actions/get-current-user";
import { getPostsByFollowing } from "@/_actions/post.action";
import { getSuggestedUsers } from "@/_actions/user.action";
import Container from "@/components/container";
import Footer from "@/components/footer";
import Logo from "@/components/logo";
import PostCard from "@/components/post-card";
import Stories from "@/components/stories";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import SuggestUserSide from "@/components/suggest-user-side";
import { getStories } from "@/_actions/stories.action";

export const metadata: Metadata = {
  title: "Nextagram | instagram clone",
  description:
    "Nextagram is instagram clone built using Nextjs and TailwindCSS",
  openGraph: {
    title: "Nextagram | instagram clone",
    description:
      "Nextagram is instagram clone built using Nextjs and TailwindCSS",
    url: "http://localhost:3000/",
    siteName: "Nextagram",
    locale: "en_US",
    type: "website",
  },
};

export default async function Home() {
  const currentUser = await getCurrentUser();
  const suggestedUsers = await getSuggestedUsers();
  const posts = await getPostsByFollowing(currentUser?.id as string);
  const stories = await getStories();

  if (!currentUser?.emailVerified) {
    redirect("/verification");
  }

  return (
    <Container className="max-w-screen-lg lg:px-3 pt-0 lg:pt-12 pb-6">
      <div className="min-h-screen flex justify-between space-x-14 flex-nowrap">
        <div className="flex-1 min-w-0 overflow-auto">
          {/*mobile header*/}
          <div className="my-6 lg:hidden">
            <Logo className="h-[7dvh]" />
          </div>
          <Stories stories={stories} />
          <div className="max-w-md mx-auto space-y-5 divide-y-2">
            {!posts.length ? (
              <div className="bg-rose-100 p-5 rounded-md">
                <p className="text-rose-500 font-light leading-snug text-lg text-justify">
                  Enhance your feed by following users who share your interests.
                  Discover captivating content and connect with like-minded
                  individuals. Explore the vast realm of Nextagram and embark on
                  a journey of discovery.
                </p>
              </div>
            ) : (
              posts.map((post, index) => (
                <PostCard post={post} currentUser={currentUser} key={index} />
              ))
            )}
          </div>
        </div>

        <SuggestUserSide
          suggestedUsers={suggestedUsers}
          currentUser={currentUser}
        />
      </div>
      <Footer />
    </Container>
  );
}
