"use server";

import prisma from "@/lib/prisma";
import saveImages from "@/lib/save-images";
import { postSchema } from "@/lib/validations/post.validation";
import { revalidateTag } from "next/cache";
import getCurrentUser from "./get-current-user";
import { commentSchema } from "@/lib/validations/comment.validation";

export const createPost = async (formData: FormData) => {
  const currentUser = await getCurrentUser();

  const uploadsFolder = "public/images/posts";

  const caption = formData.get("caption");
  const location = formData.get("location");
  const images: File[] | null = formData.getAll("images") as unknown as File[];

  // input validation
  const validation = postSchema.safeParse({
    caption,
    images,
    location,
  });

  if (!validation.success) {
    console.log(validation.error.errors.at(0));
    throw new Error(validation.error.errors.at(0)?.message);
  }

  // save image to public folder
  const savedImages = await saveImages(uploadsFolder, images);

  try {
    // Create a new post in the database.
    const newPost = await prisma.post.create({
      data: {
        caption: caption as string,
        location: (location as string) ?? undefined,
        images: {
          create: savedImages,
        },
        authorId: currentUser?.id,
      },
    });

    // Revalidate the "post" tag to ensure that the new post is reflected in the cache.
    revalidateTag("post");

    return "create new post successfully";
  } catch (error) {
    // Throw a generic error message if something goes wrong.
    throw new Error("something went wrong");
  }
};

export const getPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        images: true,
        likedByUsers: true,
        commentedByUsers: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            likedByUsers: true,
            commentedByUsers: true,
          },
        },
      },
    });

    return posts;
  } catch (error) {
    throw new Error("failed to fetch posts");
  }
};
