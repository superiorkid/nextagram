"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MdLogout } from "react-icons/md";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    signOut({ redirect: false })
      .then((callback) => {
        toast.success("Logged out");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Logged out error");
      });
  };

  return (
    <button
      type="button"
      className="border-2 rounded-full p-5 bg-rose-50"
      onClick={handleLogout}
    >
      <MdLogout className="w-6 h-6" />
    </button>
  );
};

export default LogoutButton;
