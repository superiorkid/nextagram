import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="h-[10dvh] space-y-3 mt-14">
      <div className="flex flex-wrap text-xs justify-center space-x-4 md:space-x-0 gap-y-1 md:justify-between text-gray-500">
        <Link href="#meta">Meta</Link>
        <Link href="#about">About</Link>
        <Link href="#blog">Blog</Link>
        <Link href="#jobs">Jobs</Link>
        <Link href="#help">Help</Link>
        <Link href="#privacy">Privacy</Link>
        <Link href="#terms">Terms</Link>
        <Link href="#locations">Locations</Link>
        <Link href="#instagram-lite">Instagram Lite</Link>
        <Link href="#threads">Threads</Link>
        <Link href="#contact">Contact Uploading & Non-Users</Link>
        <Link href="#meta-verified">Meta Verified</Link>
      </div>
      <div className="flex text-xs justify-center text-gray-500">
        <p>&copy; 2023 Nextagram from Superiorkid</p>
      </div>
    </footer>
  );
};

export default Footer;
