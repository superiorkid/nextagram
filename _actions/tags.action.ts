"use server";

import prisma from "@/lib/prisma";

export const getTags = async () => {
  return await prisma.tag.findMany();
};
