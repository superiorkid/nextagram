"use server";

import getCurrentUser from "@/_actions/get-current-user";
import prisma from "@/lib/prisma";
import {
  TProfileWithoutImageSchema,
  profileSchema,
} from "@/lib/validations/profile.validation";
import { revalidateTag } from "next/cache";

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
  const validation = profileSchema.safeParse(userInputs);

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
