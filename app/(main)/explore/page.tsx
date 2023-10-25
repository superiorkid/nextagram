import getCurrentUser from "@/_actions/get-current-user";
import { getPosts } from "@/_actions/post.action";
import Container from "@/components/container";
import MasonryGrid from "@/components/masonry-grid";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Explore | Nextagram",
  description: "Explore interest post relate to you",
  openGraph: {
    title: "Explore | Nextagram",
    description: "Explore interest post relate to you",
    url: "http://localhost:3000/explore",
    siteName: "Nextagram",
    locale: "en_US",
    type: "website",
  },
};

async function ExplorePage() {
  const posts = await getPosts(20);
  const currentUser = await getCurrentUser();

  if (!currentUser?.emailVerified) {
    redirect("/verification");
  }

  return (
    <Container className="max-w-screen-lg min-h-screen my-5">
      <MasonryGrid posts={posts} currentUser={currentUser} />
    </Container>
  );
}

export default ExplorePage;
