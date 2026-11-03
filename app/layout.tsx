import type { Metadata } from "next";
import { favorit, gtAmerica, notoSansJp } from "./fonts";
import "./globals.css";

const TITLE = "商品一覧 | OWNDAYS × MELLER（メラー） 公式オンラインストア｜サングラス";
const DESCRIPTION =
  "OWNDAYS × MELLER 商品一覧。デザイン性・機能性に優れたサステナブルな素材のサングラス（全てUV99%以上カット・偏光レンズ・傷防止コート・撥水コート）を展開中。";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: TITLE,
  description: DESCRIPTION,
  keywords: "商品一覧,サングラス,偏光レンズ,Meller,メラー,アイウェア,フレーム,サステイナブ,トレンド,バルセロナ,スペイン,OWNDAYS,オンデーズ,オンデイズ".split(","),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "ja_JP",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "OWNDAYS × MELLER" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og.png"] },
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
