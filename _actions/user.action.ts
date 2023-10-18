"use server";

import getCurrentUser from "@/_actions/get-current-user";
import prisma from "@/lib/prisma";
import {
  TProfileWithoutImageSchema,
  profileWithoutImageSchema,
  profileImageSchema,
} from "@/lib/validations/profile.validation";
import { revalidateTag } from "next/cache";
import saveImages from "@/lib/save-images";

export const getSuggestedUsers = async () => {
  const currentUser = await getCurrentUser();

  try {
    const usersExceptCurrentUser = await prisma.user.findMany({
      where: {
        NOT: {
          id: currentUser?.id,
        },
      },
      include: {
        followers: true,
        following: true,
      },
    });

    const followingUserIds = await prisma.follows.findMany({
      where: {
        followerId: currentUser?.id,
      },
      select: {
        followingId: true,
      },
    });

    const followingIds = followingUserIds.map((follow) => follow.followingId);

    return usersExceptCurrentUser
      .filter((user) => !followingIds.includes(user.id))
      .slice(0, 5);
  } catch (error) {
    throw new Error(`Error fetching suggested users`);
  }
};

export const getUser = async (name: string) => {
  try {
    return await prisma.user.findFirst({
      where: {
        name,
      },
      include: {
        posts: {
          include: {
            author: true,
            images: true,
            commentedByUsers: {
              include: {
                user: true,
              },
            },
            likedByUsers: true,
            _count: {
              select: {
                likedByUsers: true,
                commentedByUsers: true,
              },
            },
          },
        },
        followers: true,
        following: true,
        _count: {
          select: {
            posts: true,
            following: true,
            followers: true,
          },
        },
      },
    });
  } catch (error) {
    throw new Error("cannot fetch user detail");
  }
};

export const getSearchUsers = async (name: string) => {
  const currentUser = await getCurrentUser();

  return await prisma.user.findMany({
    where: {
      name: {
        contains: name,
      },
      NOT: {
        name: currentUser?.name,
      },
    },
  });
};

export const updateProfile = async (userInputs: TProfileWithoutImageSchema) => {
  const currentUser = await getCurrentUser();

  // validation
  const validation = profileWithoutImageSchema.safeParse(userInputs);

  if (!validation.success) {
    throw new Error(validation.error.errors.at(0)?.message);
  }

  const { bio, fullName, gender, website } = userInputs;

  try {
    await prisma.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        fullName,
        gender,
        bio,
        website,
      },
    });

    revalidateTag("user");

    return "update user info successfully";
  } catch (error) {
    throw new Error("failed to update profile");
  }
};

export const follow = async (followingId: string) => {
  const currentUser = await getCurrentUser();

  const existingFollow = await prisma.follows.findFirst({
    where: {
      followingId,
      followerId: currentUser?.id,
    },
  });

  if (existingFollow) {
    throw new Error("Already Following");
  }

  await prisma.follows.create({
    data: {
      followingId,
      followerId: currentUser?.id!,
    },
  });

  return "Followed Successfully";
};

export const unfollow = async (followingId: string) => {
  const currentUser = await getCurrentUser();

  const existingFollow = await prisma.follows.findFirst({
    where: {
      followingId,
      followerId: currentUser?.id,
    },
  });

  if (!existingFollow) {
    throw new Error("Not following");
  }

  await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId: currentUser?.id!,
        followingId,
      },
    },
  });

  return "Unfollowed successfully";
};

export const removeProfilePhoto = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.image) {
    return true;
  }

  await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      image: null,
    },
  });

  revalidateTag("user");
  return true;
};

export const changeProfilePicture = async (formData: FormData) => {
  const currentUser = await getCurrentUser();

  const uploadsFolder = "public/images/profile-picture";

  const images: File[] | null = formData.getAll("images") as unknown as File[];

  // validation
  const validation = profileImageSchema.safeParse({ profilePhoto: images });

  if (!validation.success) {
    throw new Error(validation.error.errors.at(0)?.message);
  }

  // save image to public folder
  const saveImage = await saveImages(uploadsFolder, images);

  try {
    await prisma.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        image: saveImage.at(0)?.path,
      },
    });

    revalidateTag("user");

    return "update profile picture successfully";
  } catch (error) {
    throw new Error("something went wrong");
  }
};
