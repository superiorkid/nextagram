import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];
const MAX_FILE_SIZE = 1500000; // 1.5mb

export const postSchema = z.object({
  caption: z.string().nonempty(),
  images:
    typeof window === "undefined"
      ? z.undefined()
      : z
          .instanceof(FileList)
          .refine((image) => image.length !== 0, {
            message: "Image is required",
          })
          .refine(
            (image) => {
              const fileType = image.item?.(0)?.type || "";
              return ACCEPTED_IMAGE_TYPES.includes(fileType);
            },
            {
              message:
                ".jpg, .jpeg, .png, .webp, and .avif files are accepted.",
            }
          )
          .refine(
            (image) => {
              const fileSize = image.item?.(0)?.size || 0;
              return fileSize <= MAX_FILE_SIZE;
            },
            {
              message: "Image must be less than or equal to 1.5mb",
            }
          ),
});

export type TPost = z.infer<typeof postSchema>;
