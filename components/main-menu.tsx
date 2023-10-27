"use client";

import React from "react";
import Link from "next/link";
import { GoHomeFill, GoSearch } from "react-icons/go";
import { FiCompass } from "react-icons/fi";
import CreateNewPostModal from "@/components/create-new-post-modal";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";

interface Props {
  currentUser: User | null;
}

function MainMenu({ currentUser }: Props) {
  const pathname = usePathname();

  return (
    <React.Fragment>
      <Link
        href="/"
        className={cn(
          "text-base font-light hover:bg-gray-100 dark:hover:bg-gray-700 py-2.5 px-3 rounded-md",
          pathname === "/" && "font-bold"
        )}
      >
        <GoHomeFill className="w-6 h-6 inline mr-2.5" />
        Home
      </Link>
      <Link
        href="/search"
        className={cn(
          "text-base font-light hover:bg-gray-100 py-2.5 px-3 rounded-md dark:hover:bg-gray-700",
          pathname === "/search" && "font-bold"
        )}
      >
        <GoSearch className="w-6 h-6 inline mr-2.5" />
        Search
      </Link>
      <Link
        href="/explore"
        className={cn(
          "text-base font-light hover:bg-gray-100 py-2.5 px-3 rounded-md dark:hover:bg-gray-700",
          pathname === "/explore" && "font-bold"
        )}
      >
        <FiCompass className="w-6 h-6 inline mr-2.5" />
        Explore
      </Link>

      <CreateNewPostModal currentUser={currentUser} />

      <Link
        href={`/${currentUser?.name}`}
        className={cn(
          "text-base font-light hover:bg-gray-100 py-2.5 px-3 rounded-md flex items-center dark:hover:bg-gray-700",
          pathname === `/${currentUser?.name}` && "font-bold"
        )}
      >
        <div className="relative h-6 w-6 mr-2.5">
          <Image
            fill
            src={
              currentUser?.image ??
              `https://api.dicebear.com/7.x/micah/png?seed=${currentUser?.email}`
            }
            alt={`${currentUser?.name} photo`}
            className="object-cover rounded-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <span>Profile</span>
      </Link>
    </React.Fragment>
  );
}

export default MainMenu;
