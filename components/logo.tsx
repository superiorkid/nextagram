import Image from "next/image";
import nextagramLogo from "../public/assets/nextagram_logo.svg";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <Link href="/">
      <div className={cn(`relative w-auto ${className}`)}>
        <Image
          fill
          priority
          src={nextagramLogo}
          alt="nextagram logo"
          className="object-contain dark:fill-amber-50"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </Link>
  );
};

export default Logo;
