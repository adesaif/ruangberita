import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <Image
        src="/logo-icon.png"
        alt="Ruang Berita"
        width={36}
        height={36}
        className="h-8 w-8 rounded-lg sm:h-9 sm:w-9"
        priority
      />
      <span className="block">
        <Image
          src="/logo-wordmark.png"
          alt="RUANG BERITA"
          width={139}
          height={35}
          className="h-5 w-auto sm:h-6"
          priority
        />
        <span className="block whitespace-nowrap text-[8px] uppercase tracking-widest text-ink-muted sm:text-[10px]">
          Dinamis · Aktual · Kredibel
        </span>
      </span>
    </Link>
  );
}