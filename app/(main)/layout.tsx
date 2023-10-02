import Logo from "@/components/logo";
import OtherMenu from "@/components/sidebar/other-menu";
import Link from "next/link";
import React from "react";
import { FiCompass } from "react-icons/fi";
import { GoHomeFill, GoPlusCircle, GoSearch } from "react-icons/go";
import { RxAvatar } from "react-icons/rx";

interface Props {
  children: React.ReactNode;
}

const MainLayuot = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen space-x-7">
      <aside className="w-[18dvw] flex flex-col justify-between border-r border-gray-300 shadow-sm pt-12 pb-6 px-4">
        <div>
          <Logo className="h-[38px] flex items-start mb-8 ml-3 w-[120px]" />
          <nav className="flex flex-col space-y-3">
            <Link
              href="/"
              className="text-base font-bold hover:bg-gray-100 py-2.5 px-3 rounded-md"
            >
              <GoHomeFill className="w-6 h-6 inline mr-2.5" />
              Home
            </Link>
            <Link
              href="#search"
              className="text-base font-light hover:bg-gray-100 py-2.5 px-3 rounded-md"
            >
              <GoSearch className="w-6 h-6 inline mr-2.5" />
              Search
            </Link>
            <Link
              href="#explore"
              className="text-base font-light hover:bg-gray-100 py-2.5 px-3 rounded-md"
            >
              <FiCompass className="w-6 h-6 inline mr-2.5" />
              Explore
            </Link>
            <Link
              href="#create-pop-up"
              className="text-base font-light hover:bg-gray-100 py-2.5 px-3 rounded-md"
            >
              <GoPlusCircle className="w-6 h-6 inline mr-2.5" />
              Create
            </Link>
            <Link
              href="#profile"
              className="text-base font-light hover:bg-gray-100 py-2.5 px-3 rounded-md"
            >
              <RxAvatar className="w-6 h-6 inline mr-2.5" />
              Profile
            </Link>
          </nav>
        </div>

        <OtherMenu />
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default MainLayuot;
