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
        className="h-9 w-9 rounded-lg"
        priority
      />
      <span className="hidden sm:block">
        <Image
          src="/logo-wordmark.png"
          alt="RUANG BERITA"
          width={139}
          height={35}
          className="h-6 w-auto"
          priority
        />
        <span className="block text-[10px] uppercase tracking-widest text-ink-muted">
          Dinamis · Aktual · Kredibel
        </span>
      </span>
    </Link>
  );
}
