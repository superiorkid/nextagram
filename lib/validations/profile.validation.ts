import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2 mb
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];

const profileSchema = z.object({
  fullName: z.string().nullish(),
  website: z.string().nullish(),
  bio: z.string().nullish(),
  gender: z.enum(["MALE", "FEMALE"]).nullish(),
  profilePhoto: z
    .array(z.custom<File>())
    .nonempty({ message: "Image is required" })
    .max(1)
    .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), {
      message: `File size should be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    })
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      {
        message: `Only the following types are allowed : ${ACCEPTED_IMAGE_TYPES.join(
          ", "
        )}`,
      }
    ),
});

export const profileWithoutImageSchema = profileSchema.omit({
  profilePhoto: true,
});
export const profileImageSchema = profileSchema.pick({ profilePhoto: true });

export type TProfileWithoutImageSchema = z.infer<
  typeof profileWithoutImageSchema
>;
export type TProfileImageSchema = z.infer<typeof profileImageSchema>;
