import Image from "next/image";
import nextagramLogo from "../public/assets/nextagram_logo.svg";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <div className={cn(`relative w-auto ${className}`)}>
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
