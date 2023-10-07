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
  caption: z.string().nonempty(),
  images: z
    .array(z.custom<File>())
    .nonempty()
    .refine(
      (files) => {
        return files.every((file) => file instanceof File);
      },
      {
        message: "Expected a file",
      }
    )
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      "File size should be less than 2mb"
    )
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only theese types are allowed .jpg .jpef .png .webp and .avif"
    ),
  location: z.string().optional(),
});

export type TPost = z.infer<typeof postSchema>;
