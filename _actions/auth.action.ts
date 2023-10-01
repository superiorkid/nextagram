"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { TRegister, registerSchema } from "@/lib/validations/auth.validation";
import { revalidateTag } from "next/cache";

export const userRegistration = async (data: TRegister): Promise<string> => {
  // validation
  const validation = registerSchema.safeParse(data);

  if (!validation.success) {
    throw new Error(validation.error.errors.at(0)?.message);
  }

  const { email, fullName, password, username } = data;

  // check already user
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    throw new Error(
      "We're sorry, but a user with that email address is already registered. Please try registering with a different email address."
    );
  }

  // hashisng password  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   save to database
  const newUser = await prisma.user.create({
    data: {
      email,
      fullName,
      name: username,
      password: hashedPassword,
    },
  });

  //   revalidate cache
  revalidateTag("user");

  return `User ${newUser.id} registered successfully`;
};
