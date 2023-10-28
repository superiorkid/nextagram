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
    throw new Error(validation.error.errors.at(0)?.message);
  }

  // save image to public folder
  const savedImages = await saveImages(uploadsFolder, images);

  try {
    // Create a new post in the database.
    await prisma.post.create({
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

export const getPosts = async (display: number) => {
  try {
    return await prisma.post.findMany({
      take: display,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          include: {
            posts: {
              include: {
                images: true,
              },
            },
            followers: true,
            following: true,
            _count: {
              select: {
                posts: true,
                followers: true,
                following: true,
              },
            },
          },
        },
        images: true,
        likedByUsers: true,
        commentedByUsers: {
          include: {
            user: true,
            commentLikes: true,
            _count: {
              select: {
                commentLikes: true,
              },
            },
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
  } catch (error) {
    throw new Error("failed to fetch posts");
  }
};

export const getPostsByFollowing = async (userId: string) => {
  const currentUser = await getCurrentUser();

  const following = await prisma.follows.findMany({
    where: {
      followerId: currentUser?.id,
    },
    select: {
      followingId: true,
    },
  });

  const followingIds = following.map((f) => f.followingId);

  return await prisma.post.findMany({
    where: {
      OR: [
        {
          authorId: currentUser?.id,
        },
        {
          authorId: {
            in: followingIds,
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        include: {
          posts: {
            include: {
              images: true,
            },
          },
          followers: true,
          following: true,
          _count: {
            select: {
              posts: true,
              followers: true,
              following: true,
            },
          },
        },
      },
      images: true,
      likedByUsers: true,
      commentedByUsers: {
        include: {
          user: true,
          commentLikes: true,
          _count: {
            select: {
              commentLikes: true,
            },
          },
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
};
