import getCurrentUser from "@/_actions/get-current-user";
import prisma from "@/lib/prisma";
import jwt, { Secret } from "jsonwebtoken";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  const currentUser = await getCurrentUser();
  const token = params.token;

  const tokenDecode = jwt.verify(
    token,
    process.env.NEXTAUTH_SECRET as Secret
  ) as { email: string; iat: number; exp: number };

  if (!currentUser) {
    return NextResponse.json({ message: "Login first" }, { status: 401 });
  }

  if (currentUser.email !== tokenDecode.email) {
    return NextResponse.json(
      {
        message:
          "Account verification failed. Please send new email verification",
      },
      { status: 403 }
    );
  }

  await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  revalidateTag("user");

  redirect("/");
}
