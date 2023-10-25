"use server";

import { sendMail } from "@/_actions/emails/send-email";
import prisma from "@/lib/prisma";
import { TRegister, registerSchema } from "@/lib/validations/auth.validation";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { revalidateTag } from "next/cache";

export const userRegistration = async (data: TRegister): Promise<string> => {
  // validation
  const validation = registerSchema.safeParse(data);

  if (!validation.success) {
    throw new Error(validation.error.errors.at(0)?.message);
  }

  const { email, fullName, password, username } = data;

  // check already user
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { name: username }],
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

  try {
    // save to database
    const newUser = await prisma.user.create({
      data: {
        email,
        fullName,
        name: username,
        password: hashedPassword,
      },
    });

    // generate unique token
    const token = jwt.sign({ email }, process.env.NEXTAUTH_SECRET as Secret, {
      expiresIn: "1h",
    });

    await sendMail({
      token,
      subject: "User registration",
      toEmail: email,
    });

    //   revalidate cache
    revalidateTag("user");

    return `User ${newUser.id} registered successfully`;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
