import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().nullish(),
  website: z.string().nullish(),
  bio: z.string().nullish(),
  gender: z.enum(["MALE", "FEMALE"]).nullish(),
});

export type TProfileSchema = z.infer<typeof profileSchema>;
