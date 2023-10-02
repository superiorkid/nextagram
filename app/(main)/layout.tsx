import Logo from "@/components/logo";
import Menu from "@/components/sidebar/menu";
import OtherMenu from "@/components/sidebar/other-menu";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const MainLayuot = ({ children }: Props) => {
  return (
    <div className="flex">
      <aside className="hidden w-[18dvw] lg:flex flex-col sticky top-0 max-h-[100dvh] justify-between border-r border-gray-300 shadow-sm pt-12 pb-6 px-4">
        <div>
          <Logo className="h-[38px] flex items-start mb-8 ml-3 w-[120px]" />
          <Menu />
        </div>

        <OtherMenu />
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default MainLayuot;
