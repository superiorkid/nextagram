"use server";

import prisma from "@/lib/prisma";

export async function getComments(postId: string) {
  try {
    const comments = await prisma.comments.findMany({
      where: {
        postId,
      },
    });
    return comments;
  } catch (error) {
    throw new Error("failed to get comments");
  }
}
