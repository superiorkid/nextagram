import { z } from "zod";

const loginSchama = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(6).nonempty(),
});

const registerSchema = loginSchama.extend({
  username: z.string().nonempty(),
  fullName: z.string().min(3).nonempty(),
});

export type TLogin = z.infer<typeof loginSchama>;
export type TRegister = z.infer<typeof registerSchema>;
