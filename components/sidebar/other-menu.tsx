"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoGear } from "react-icons/go";

const OtherMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-base text-left font-light hover:bg-gray-100 py-2.5 px-3 rounded-md w-full focus:outline-none">
        <RxHamburgerMenu className="w-7 h-7 inline mr-2.5 " />
        More
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" className="w-[300px]">
        <DropdownMenuItem className="text-base hover:font-bold hover:bg-gray-100 py-2.5">
          <GoGear className="w-5 h-5 inline mr-2.5" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-base hover:font-bold hover:bg-gray-100 py-2.5">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OtherMenu;
