import { z } from "zod";

export const loginSchama = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address.")
    .min(1, "Email address is required."),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long."),
});

export const registerSchema = loginSchama.extend({
  username: z
    .string()
    .trim()
    .regex(
      new RegExp("^[A-Za-z]\\w{4,14}$"),
      "Username must be at least 4 characters long and contain only letters, numbers, and underscores."
    )
    .min(1, "Username is required."),
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters long."),
});

export type TLogin = z.infer<typeof loginSchama>;
export type TRegister = z.infer<typeof registerSchema>;
