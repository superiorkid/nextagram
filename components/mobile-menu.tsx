import React from "react";
import Link from "next/link";
import { GoHomeFill, GoPlusCircle, GoSearch } from "react-icons/go";
import { FiCompass } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";

function MobileMenu() {
  return (
    <div className="flex justify-between w-full py-3">
      <Link href="/">
        <GoHomeFill className="w-7 h-7" />
      </Link>
      <Link href="/search">
        <GoSearch className="w-7 h-7" />
      </Link>
      <Link href="#">
        <FiCompass className="w-7 h-7 " />
      </Link>
      <Link href="#">
        <GoPlusCircle className="w-7 h-7" />
      </Link>
      <Link href="#">
        <RxAvatar className="w-7 h-7" />
      </Link>
    </div>
  );
}

export default MobileMenu;
