import { User } from "@prisma/client";
import React from "react";
import MainMenu from "../main-menu";

interface Props {
  currentUser: User | null;
}

const Menu = ({ currentUser }: Props) => {
  return (
    <nav className="flex flex-col space-y-3">
      <MainMenu currentUser={currentUser} />
    </nav>
  );
};

export default Menu;
