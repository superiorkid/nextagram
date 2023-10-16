"use client";

import React from "react";
import Link from "next/link";
import useSettingsRoutes from "@/hooks/useSettingsRoutes";
import { cn } from "@/lib/utils";

function SettingsRoutes() {
  const routes = useSettingsRoutes();

  return (
    <div className="flex flex-col mx-10 mt-6">
      {routes.map((route, index) => (
        <Link
          key={index}
          href={route.href}
          className={cn(
            "hover:bg-gray-200/50 p-3 rounded-md text-sm",
            route.isActive && "bg-gray-200/70"
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
}

export default SettingsRoutes;
