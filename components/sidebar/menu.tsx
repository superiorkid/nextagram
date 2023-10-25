import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { FiCompass } from "react-icons/fi";
import { GoHomeFill, GoSearch } from "react-icons/go";
import Image from "next/image";
import CreateNewPostModal from "@/components/create-new-post-modal";
import generateAvatar from "@/lib/generate-avatar";

interface Props {
  currentUser: User | null;
}

const Menu = ({ currentUser }: Props) => {
  return (
    <nav className="flex flex-col space-y-3">
      <Link
        href="/"
        className="text-base font-bold hover:bg-gray-100 py-2.5 px-3 rounded-md"
      >
        <GoHomeFill className="w-6 h-6 inline mr-2.5" />
        Home
      </Link>
      <Link
        href="/search"
        className="text-base font-light hover:bg-gray-100 py-2.5 px-3 rounded-md"
      >
        <GoSearch className="w-6 h-6 inline mr-2.5" />
        Search
      </Link>
      <Link
        href="/explore"
        className="text-base font-light hover:bg-gray-100 py-2.5 px-3 rounded-md"
      >
        <FiCompass className="w-6 h-6 inline mr-2.5" />
        Explore
      </Link>

      <CreateNewPostModal currentUser={currentUser} />

      <Link
        href={`/${currentUser?.name}`}
        className="text-base font-light hover:bg-gray-100 py-2.5 px-3 rounded-md flex items-center"
      >
        <div className="relative h-6 w-6 mr-2.5">
          <Image
            fill
            src={
              currentUser?.image ?? generateAvatar(currentUser?.email as string)
            }
            alt={`${currentUser?.name} photo`}
            className="object-cover rounded-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <span>Profile</span>
      </Link>
    </nav>
  );
};

export default Menu;
