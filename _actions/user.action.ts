"use server";

import prisma from "@/lib/prisma";
import getCurrentUser from "@/_actions/get-current-user";

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
