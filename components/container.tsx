import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

function Container({ children, className }: Props) {
  return (
    <div className={cn(`max-w-screen-md mx-auto ${className}`)}>{children}</div>
  );
}

export default Container;
