"use server";

import prisma from "@/lib/prisma";
import getCurrentUser from "@/_actions/get-current-user";

export const getSuggestedUsers = async () => {
  const currentUser = await getCurrentUser();

  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          email: currentUser?.email,
        },
      },
    });

    return users;
  } catch (e) {
    throw new Error("something went wrong");
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
