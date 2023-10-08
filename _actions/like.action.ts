"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import getCurrentUser from "./get-current-user";

export const likePost = async (postId: string) => {
  const currentUser = await getCurrentUser();

  try {
    await prisma.likes.create({
      data: {
        postId,
        userId: currentUser?.id!,
      },
    });

    revalidateTag("like");

    return "like operation successfully";
  } catch (error) {
    throw new Error("failed to running like operations");
  }
};

export const dislikePost = async (postId: string) => {
  const currentUser = await getCurrentUser();

  try {
    await prisma.likes.deleteMany({
      where: {
        AND: [{ postId }, { userId: currentUser?.id! }],
      },
    });

    revalidateTag("like");

    return "dislike operation successfully";
  } catch (error) {
    throw new Error("failed to running dislike operations");
  }
};
