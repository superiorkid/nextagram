"use server";

import prisma from "@/lib/prisma";
import getCurrentUser from "./get-current-user";
import { revalidateTag } from "next/cache";
import { MergedData } from "@/typings";

export async function getStories() {
  try {
    const stories = await prisma.stories.findMany({
      where: {
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        author: true,
      },
      orderBy: {
        postedAt: "desc",
      },
    });

    const mergedData: Record<string, MergedData> = {};

    for (const post of stories) {
      const authorId = post.author.id;
      if (!mergedData[authorId]) {
        mergedData[authorId] = { author: post.author, stories: [] };
      }
      mergedData[authorId].stories.push(post);
    }

    return Object.values(mergedData);
  } catch (error) {
    throw new Error("failed to view stories");
  }
}

export const viewStory = async (storyId: string) => {
  const currentUser = await getCurrentUser();

  const alreadySeen = await haveSeen(storyId);

  if (!alreadySeen) {
    const seeStory = await prisma.storyViews.create({
      data: {
        stories: {
          connect: {
            id: storyId,
          },
        },
        user: {
          connect: {
            id: currentUser?.id,
          },
        },
      },
    });

    revalidateTag("story");
    return true;
  }

  return true;
};

export const haveSeen = async (storyId: string) => {
  const currentUser = await getCurrentUser();

  // check if have seen story
  return await prisma.storyViews.findFirst({
    where: {
      storiesId: storyId,
      userId: currentUser?.id,
    },
  });
};
