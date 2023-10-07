import React from "react";
import Image from "next/image";
import { User } from "@prisma/client";
import { RxAvatar } from "react-icons/rx";

interface Props {
  user: User;
}

const UserCard = ({ user }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-2.5 items-center">
        {user.image ? (
          <div className="relative w-12 h-12">
            <Image
              fill
              src={user?.image!}
              alt="profile photo"
              className="object-cover rounded-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <RxAvatar className="w-12 h-12" />
        )}

        <div className="text-sm">
          <p className="font-bold tracking-wide">{user.name}</p>
          <p className="text-gray-500 text-xs">Followed by _danu.ar</p>
        </div>
      </div>
      <button className="text-sm text-sky-500 font-bold">Follow</button>
    </div>
  );
};

export default UserCard;