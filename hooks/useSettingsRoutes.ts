import { usePathname } from "next/navigation";
import { useMemo } from "react";

const useSettingsRoutes = () => {
  const pathname = usePathname();

  return useMemo<
    {
      label: string;
      href: string;
      isActive: boolean;
    }[]
  >(
    () => [
      {
        label: "Dashboard",
        href: "/settings/dashboard",
        isActive: pathname === "/settings/dashboard",
      },
      {
        label: "Profile",
        href: "/settings/profile",
        isActive: pathname === "/settings/profile",
      },
    ],
    [pathname]
  );
};

export default useSettingsRoutes;
