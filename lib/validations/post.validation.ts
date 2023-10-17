import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2 mb
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];

export const postSchema = z.object({
  caption: z.string().trim().min(1, { message: "Caption is required" }),
  images: z
    .array(z.custom<File>())
    .nonempty({ message: "At least one image is required" })
    .max(5)
    .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), {
      message: `File size should be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    })
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      {
        message: `Only the following image types are allowed: ${ACCEPTED_IMAGE_TYPES.join(
          ", "
        )}`,
      }
    ),
  location: z.string().nullish(),
});

export type TPost = z.infer<typeof postSchema>;
