"use server";

import prisma from "@/lib/prisma";
import saveImages from "@/lib/save-images";
import { postSchema } from "@/lib/validations/post.validation";
import { revalidateTag } from "next/cache";
import getCurrentUser from "./get-current-user";

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

  // try {
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
  // } catch (error) {
  //   // Throw a generic error message if something goes wrong.
  //   throw new Error("something went wrong");
  // }
};
