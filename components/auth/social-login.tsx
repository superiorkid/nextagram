"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { FaDiscord } from "react-icons/fa6";

interface Props {
  className?: string;
  provider: string;
  label: string;
}

const SocialLogin = ({ className, provider, label }: Props) => {
  return (
    <button className={cn(`w-full ${className}`)}>
      <FaDiscord className="w-5 h-5 inline mr-1" /> {label}
    </button>
  );
};

export default SocialLogin;
