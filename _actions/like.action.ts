"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import getCurrentUser from "./get-current-user";

export const likePost = async (postId: string) => {
  const currentUser = await getCurrentUser();

  try {
    await prisma.likes.create({
      data: {
        post: {
          connect: { id: postId },
        },
        user: {
          connect: { id: currentUser?.id! },
        },
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
    await prisma.likes.delete({
      where: {
        userId_postId: {
          postId,
          userId: currentUser?.id!,
        },
      },
    });

    revalidateTag("like");

    return "dislike operation successfully";
  } catch (error) {
    throw new Error("failed to running dislike operations");
  }
};
