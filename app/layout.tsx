import type { Metadata } from "next";
import { favorit, gtAmerica, notoSansJp } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "商品一覧 | OWNDAYS × MELLER（メラー） 公式オンラインストア｜サングラス",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${favorit.variable} ${gtAmerica.variable} ${notoSansJp.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
