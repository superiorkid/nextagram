import React from "react";
import SettingsRoutes from "@/components/settings-routes.";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex space-x-7">
      <aside className="w-[17dvw] flex-none border-r pt-14">
        <strong className="tracking-wide text-xl pl-12">Settings</strong>
        <SettingsRoutes />
      </aside>

      <main className="flex-1 min-w-0 overflow-auto">{children}</main>
    </div>
  );
}

export default Layout;
