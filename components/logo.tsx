import Image from "next/image";

import nextagramLogo from "../public/assets/nextagram_logo.svg";

const Logo = () => {
  return (
    <div className="relative h-[46px] w-auto my-4">
      <Image
        fill
        priority
        src={nextagramLogo}
        alt="nextagram logo"
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export default Logo;
