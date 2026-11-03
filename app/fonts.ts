import { Noto_Sans_JP } from "next/font/google";
import localFont from "next/font/local";

export const favorit = localFont({
  variable: "--nf-favorit",
  display: "swap",
  src: [
    { path: "../public/fonts/Favorit-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Favorit-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Favorit-Bold.woff2", weight: "700", style: "normal" },
  ],
});

export const gtAmerica = localFont({
  variable: "--nf-gt",
  display: "swap",
  src: [
    { path: "../public/fonts/GTAmericaTrial-Md.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/GTAmericaTrial-CmBl.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/GTAmericaTrial-CmBd.woff2", weight: "900", style: "normal" },
  ],
});

export const notoSansJp = Noto_Sans_JP({
  variable: "--nf-noto",
  weight: ["500"],
  subsets: ["latin"],
  preload: false,
  display: "swap",
});
