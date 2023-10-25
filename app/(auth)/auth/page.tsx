import getCurrentUser from "@/_actions/get-current-user";
import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: {
    variant: "login" | "register";
  };
}

export const metadata: Metadata = {
  title: "Authentication | Nextagram",
  description: "Login or Register to continue using this app",
  openGraph: {
    title: "Authentication | Nextagram",
    description: "Login or Register to continue using this app",
    url: "http://localhost:3000/auth",
    siteName: "Nextagram",
    locale: "en_US",
    type: "website",
  },
};

const AuthPage = async ({ searchParams: { variant } }: Props) => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect("/");
  }

  return (
    <React.Fragment>
      <div className="border border-gray-300 pt-7 pb-6 px-10 mb-3">
        {variant === "register" ? <Register /> : <Login />}
      </div>
      <div className="p-5 border border-gray-300 mb-4">
        <p className="text-center text-sm">
          {variant !== "register"
            ? "Dont have an account? "
            : "Have an account? "}
          <Link
            href={
              variant !== "register"
                ? "/auth?variant=register"
                : "/auth?variant=login"
            }
            className="font-bold text-sky-500"
          >
            {variant !== "register" ? "Sign up" : "Log in"}
          </Link>
        </p>
      </div>
      <div className="text-center text-sm space-y-4">
        <p>Get the app.</p>
        <div className="flex space-x-4 items-center justify-between px-5">
          <div className="relative h-[5dvh] w-full">
            <Image
              fill
              src="https://ik.imagekit.io/superiorkid/instagram-clone/assets/app-store.png?updatedAt=1695552130406"
              alt="app store logo"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          </div>

          <div className="relative h-[5dvh] w-full">
            <Image
              fill
              src=" https://ik.imagekit.io/superiorkid/instagram-clone/assets/play-store.png?updatedAt=1695552130424"
              alt="google playstore logo"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AuthPage;
