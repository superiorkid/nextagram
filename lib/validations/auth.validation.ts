import { z } from "zod";

export const loginSchama = z.object({
  email: z.string().email("Invalid email address.").nonempty("Email address is required."),
  password: z.string().min(6, "Password must be at least 6 characters long.").nonempty("Password is required."),
});

export const registerSchema = loginSchama.extend({
  username: z.string().regex(new RegExp("^[A-Za-z]\\w{4,14}$"), "Username must be at least 4 characters long and contain only letters, numbers, and underscores.").nonempty("Username is required."),
  fullName: z.string().min(3, "Full name must be at least 3 characters long.").nonempty("Full name is required.\n"),
});

export type TLogin = z.infer<typeof loginSchama>;
export type TRegister = z.infer<typeof registerSchema>;
