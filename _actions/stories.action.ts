import prisma from "@/lib/prisma";

export async function getStories() {
  try {
    const stories = await prisma.stories.findMany({
      include: {
        author: true,
      },
    });

    return stories;
  } catch (error) {
    throw new Error("failed to view stories");
  }
}
