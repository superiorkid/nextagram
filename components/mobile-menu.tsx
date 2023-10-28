import React from "react";
import Link from "next/link";
import { GoHomeFill, GoSearch } from "react-icons/go";
import { FiCompass } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { User } from "@prisma/client";
import CreateNewPostModal from "./create-new-post-modal";

interface Props {
  currentUser: User | null;
}

function MobileMenu({ currentUser }: Props) {
  return (
    <div className="flex justify-between w-full py-3">
      <Link href="/">
        <GoHomeFill className="w-7 h-7" />
      </Link>
      <Link href="/search">
        <GoSearch className="w-7 h-7" />
      </Link>
      <Link href="/explore">
        <FiCompass className="w-7 h-7 " />
      </Link>

      <CreateNewPostModal currentUser={currentUser} variant="MOBILE" />

      <Link href="#">
        <RxAvatar className="w-7 h-7" />
      </Link>
    </div>
  );
}

export default MobileMenu;
