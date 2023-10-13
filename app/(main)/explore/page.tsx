import React from "react";
import Container from "@/components/container";
import MasonryGrid from "@/components/masonry-grid";
import { getPosts } from "@/_actions/post.action";
import getCurrentUser from "@/_actions/get-current-user";

async function ExplorePage() {
  const posts = await getPosts(20);
  const currentUser = await getCurrentUser();

  return (
    <Container className="max-w-screen-lg min-h-screen my-5">
      <MasonryGrid posts={posts} currentUser={currentUser} />
    </Container>
  );
}

export default ExplorePage;
