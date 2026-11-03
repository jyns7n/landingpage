import Image from "next/image";
import { SectionTitle } from "./SectionTitle";

export function Hero() {
  return (
    <section
      id="top"
      className="relative h-[677px] overflow-hidden border-b border-black lg:h-[633px]"
    >
      <Image
        src="/brand/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_47.9%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/brand/hero-grain.png')] bg-[length:1335px_869px] bg-left-top opacity-30"
      />
      <div className="absolute left-1/2 top-[295px] -translate-x-1/2 lg:top-[260px]">
        <SectionTitle as="h1" size="hero" lines={["PRODUCTS"]} />
      </div>
    </section>
  );
}
