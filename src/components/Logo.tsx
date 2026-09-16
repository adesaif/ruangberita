import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <span className="block">
        <Image
          src="/logo-wordmark.png"
          alt="RUANG BERITA"
          width={278}
          height={70}
          quality={100}
          unoptimized
          className="h-6 w-auto sm:h-7"
          priority
        />
        <span className="block whitespace-nowrap text-[8px] uppercase tracking-widest text-ink-muted sm:text-[10px]">
          Dinamis · Aktual · Kredibel
        </span>
      </span>
    </Link>
  );
}