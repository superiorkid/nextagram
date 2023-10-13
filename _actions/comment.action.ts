"use server";

import getCurrentUser from "@/_actions/get-current-user";
import { commentSchema } from "@/lib/validations/comment.validation";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export const createComment = async (formData: FormData, postId: string) => {
  const currentUser = await getCurrentUser();
  const comment = formData.get("comment") as string;

  const validation = commentSchema.safeParse({
    content: comment,
  });

  if (!validation.success) {
    throw new Error(validation.error.errors.at(0)?.message);
  }

  try {
    await prisma.comments.create({
      data: {
        content: comment,
        user: {
          connect: {
            id: currentUser?.id!,
          },
        },
        post: {
          connect: { id: postId },
        },
      },
    });

    revalidateTag("comment");

    return true;
  } catch (e) {
    throw new Error("something went wrong");
  }
};
