import getCurrentUser from "@/_actions/get-current-user";
import Logo from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import Menu from "@/components/sidebar/menu";
import OtherMenu from "@/components/sidebar/other-menu";
import { User } from "@prisma/client";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const MainLayuot = async ({ children }: Props) => {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex">
      <aside className="hidden w-[18dvw] lg:flex flex-col sticky top-0 max-h-[100dvh] justify-between border-r border-gray-300 shadow-sm pt-12 pb-6 px-4">
        <div>
          <Logo className="h-[38px] flex items-start mb-8 ml-3 w-[120px]" />
          <Menu currentUser={currentUser} />
        </div>

        <OtherMenu />
      </aside>
      <main className="flex-1 min-w-0 overflow-auto">{children}</main>

      {/*mobile menu*/}
      <div className="flex bg-white items-center fixed bottom-0 w-full px-9 lg:hidden border-t shadow-md">
        <MobileMenu currentUser={currentUser} />
      </div>
    </div>
  );
};

export default MainLayuot;
