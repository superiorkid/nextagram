import prisma from "@/lib/prisma";

export async function getStories() {
  try {
    const stories = await prisma.user.findMany({
      where: {
        NOT: {
          stories: {
            none: {},
          },
        },
      },
      include: {
        stories: true,
      },
    });

    return stories;
  } catch (error) {
    throw new Error("failed to view stories");
  }
}
