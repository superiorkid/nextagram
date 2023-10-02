import React from "react";
import Image from "next/image";

const UserCard = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-2.5 items-center">
        <Image
          src="https://images.unsplash.com/photo-1514136649217-b627b4b9cfb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
          alt="profile photo"
          height={300}
          width={300}
          className="object-cover rounded-full w-12 h-12"
        />
        <div className="text-sm">
          <p className="font-bold tracking-wide">nothingToSay</p>
          <p className="text-gray-500 text-xs">Followed by _danu.ar</p>
        </div>
      </div>
      <button className="text-sm text-sky-500 font-bold">Follow</button>
    </div>
  );
};

export default UserCard;
