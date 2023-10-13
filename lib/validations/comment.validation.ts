import { z } from "zod";

export const commentSchema = z.object({
  content: z.string().nonempty(),
});

export type TComment = z.infer<typeof commentSchema>;
