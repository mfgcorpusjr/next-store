import Link from "next/link";
import Image from "next/image";

import logoImg from "@/assets/images/logo.png";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={logoImg}
        alt="logo"
        width={32}
        height={32}
        className="size-8"
      />

      <h1 className="text-xl font-extrabold tracking-tight">Next Store</h1>
    </Link>
  );
}
