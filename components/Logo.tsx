import Image from "next/image";

export function Logo() {
  return (
    <a href="#top" aria-label="OWNDAYS x MELLER" className="block shrink-0">
      <span className="relative hidden h-[52px] w-[351px] lg:block">
        <Image src="/brand/collab-logo.svg" alt="" fill unoptimized priority />
      </span>
      <span className="relative block h-[16px] w-[240px] overflow-hidden lg:hidden">
        <span className="absolute left-0 top-[-10px] block h-[35.556px] w-[240px]">
          <Image src="/brand/collab-logo.svg" alt="" fill unoptimized priority />
        </span>
      </span>
    </a>
  );
}
