import { type NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchama } from "@/lib/validations/auth.validation";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "Enter email address",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials, req) {
        // validation
        const validation = loginSchama.safeParse({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (!validation.success) {
          return null;
        }

        // check account already in database
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) {
          return null;
        }

        // check password is match
        const passwordMatches = await bcrypt.compare(
          credentials?.email as string,
          user.password as string
        );

        if (!passwordMatches) {
          return null;
        }

        // return user
        return user;
      },
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
