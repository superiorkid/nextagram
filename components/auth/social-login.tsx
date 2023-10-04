"use client";

import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import React from "react";
import { FaDiscord } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { VscLoading } from "react-icons/vsc";

interface Props {
  className?: string;
  provider: string;
  label: string;
}

const SocialLogin = ({ className, provider, label }: Props) => {
  const router = useRouter();

  const handleSocialLogin = (provider: string) => {
    signIn(provider, { redirect: false })
      .then((callback) => {
        toast(`Redirect to ${provider}`, {
          icon: <VscLoading className="animate-spin" />,
        });
        router.refresh();
      })
      .catch((error) => {
        toast.error("Login Error");
      });
  };

  return (
    <button
      className={cn(`w-full ${className}`)}
      onClick={() => handleSocialLogin(provider)}
    >
      <FaDiscord className="w-5 h-5 inline mr-1" /> {label}
    </button>
  );
};

export default SocialLogin;
