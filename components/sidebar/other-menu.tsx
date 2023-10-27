"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { GoGear } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import React from "react";
import { FaRegMoon } from "react-icons/fa";
import ChangeThemeButton from "@/components/change-theme-button";

const OtherMenu = () => {
  const router = useRouter();

  const handleLogout = () => {
    signOut({ redirect: false })
      .then((callback) => {
        toast.success("Logged out");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Logged out error");
      });
  };

  return (
    <div className="space-y-1">
      <DropdownMenu>
        <DropdownMenuTrigger className="text-base text-left font-light hover:bg-gray-100 py-2.5 px-3 rounded-md w-full focus:outline-none dark:hover:bg-gray-700">
          <RxHamburgerMenu className="w-6 h-6 inline mr-2.5 " />
          More
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" className="w-[16dvw] mx-3">
          <DropdownMenuItem
            className="text-base hover:font-bold hover:bg-gray-100 py-2.5 hover:cursor-pointer"
            asChild
          >
            <Link href="/settings/profile">
              <GoGear className="w-5 h-5 inline mr-2.5" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-base hover:font-bold hover:bg-gray-100 py-2.5 hover:cursor-pointer"
            onClick={handleLogout}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ChangeThemeButton />
    </div>
  );
};

export default OtherMenu;
