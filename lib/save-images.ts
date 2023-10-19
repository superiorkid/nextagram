import { writeFile } from "fs/promises";
import { join } from "path";
import slugify from "slugify";
import generateRandomString from "@/lib/generate-random-strings";

const saveImages = async (uploadsFolder: string, images: File[]) => {
  let savedImages = [];

  for (const image of images) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join(
      uploadsFolder,
      `${generateRandomString(16)}_ ${slugify(image.name)}`
    );
    await writeFile(path, buffer);

    savedImages.push({
      name: slugify(image.name),
      path: path.replace("public", ""),
    });
  }

  return savedImages;
};

export default saveImages;
