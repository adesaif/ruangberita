import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center">
      <Image
        src="/logo-wordmark.png"
        alt="RUANG BERITA"
        width={278}
        height={70}
        quality={100}
        unoptimized
        className="h-9 w-auto sm:h-10 md:h-11"
        priority
      />
    </Link>
  );
}
