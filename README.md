# OWNDAYS × MELLER — Product Listing Page

Responsive product listing page for the OWNDAYS × MELLER sunglasses collection, built from the Figma design and the public products API.

- **Stack:** Next.js 16 (App Router, Cache Components) · React 19 · TypeScript (strict) · Tailwind CSS v4 · `next/font` · `next/image`
- **Tests:** Vitest + Testing Library (unit/component) · Playwright (responsive + interaction, 4 viewports)
- **Data:** `GET https://api-one-alpha-60.vercel.app/meller/products.json` (fetched on the server, cached for 1 hour via `"use cache"` + `cacheLife("hours")`). Image paths are prefixed with `https://storage.owndays.com/storage/`.

## Getting started

Requires Node 20.19+ (developed on Node 24).

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # unit + component tests (Vitest)
npm run build && npm start
npx playwright install chromium   # first time only
npx playwright test               # e2e: builds, serves on :3100 and checks 390/768/1024/1440px
```

## What's implemented

| Area | Behaviour |
| --- | --- |
| Header | Transparent over the hero, turns solid orange after scrolling. ≥1024px text links; <1024px hamburger → full-screen menu (ESC / close / backdrop / link click dismiss, body scroll locked). |
| Hero | Figma photo + grain, "PRODUCTS" title on offset black bar. |
| Product grid | 3 columns ≥1024px, 1 column below. Cards are fluid (container-query units) so they scale exactly to the Figma 422×452 / 357×383 sizes and never overflow at in-between widths. |
| Product card | Image, model name, `code + SKU`, `¥7,800+tax`, ≤4 swatches (`+N` overflow). Swatch click changes the card image/code only; card click opens the modal on the active SKU. |
| Swatches | Solid hex, pattern image (`hex_code: null`), or a two-tone split for two-color SKUs. |
| Modal | Right panel 616px (desktop) / inset full-screen (mobile). Scroll-snap carousel, SKU chips (reset carousel to slide 1), P/No., TYPE, `PRICE ¥7,800 税込`, JP description, **ONLINE STORE** CTA. Enter/leave animation (respects `prefers-reduced-motion`), ESC + backdrop + ✕ close, focus trap, focus returns to the trigger. |
| ONLINE STORE | `https://www.owndays.com/jp/ja/products/{code}?sku={skuId}`; hover = dark orange; `in_stock === 0` → disabled grey **OUT OF STOCK** and no link. |
| HOW TO STYLE THEM | Free-scroll horizontal strip (touch/trackpad native, mouse drag-to-scroll), "+" opens the modal for the mapped product. |
| Footer | Nav anchors (ABOUT/STORES are placeholders), ONLINE STORE / OWNDAYS.COM, ALL ITEMS, legal links. |
| SEO | Title/description/keywords and OGP image (1200×630) from the Figma "Meta" frame, favicon from Figma. |
| Errors | If the API fails or returns nothing, the page renders header/hero/footer plus an error state with a retry link. |

## Project structure

```
app/            layout (fonts, metadata), page (server component, data fetch), globals.css (Tailwind theme + modal animation)
components/     Header, MobileMenu, Hero, SectionTitle, ProductGrid, ProductCard, Swatch,
                ProductModal, ImageCarousel, SkuChips, OnlineStoreButton, StyleThem, Footer, ErrorState, ModalProvider
hooks/          useBodyScrollLock, useFocusTrap, useDragScroll
lib/            types, products (fetch), product-utils (urls, stock, swatch/label logic), format (prices), style-items
tests/          Vitest specs + API fixture      e2e/   Playwright specs
docs/           spec/ (Figma tokens + reference screenshots), qa/ (screenshots), superpowers/plans (implementation plan)
```

Data flow: `app/page.tsx` (server) → `getProducts()` → `ProductGrid` / `StyleThem` (client islands) → both open the single `ProductModal` through `ModalProvider` (`{ product, skuId } | null`). Pure logic is in `lib/` and unit-tested; cards are `React.memo` so switching a swatch re-renders one card.

## Decisions & assumptions

- **Figma wins over the prose spec** where they differ: brand orange is `#ff6723`; the nav is transparent over the hero (solid orange once scrolled, so it stays readable and "sticky"); page background is orange; footer is black.
- **Style Them → product mapping** is not defined in Figma, so look *N* opens product *(N−1) mod 8*. Edit `lib/style-items.ts` to change it.
- **ALL ITEMS** (spec §6, "parts" frame) has no slot in the Figma footer; it sits in the footer's right column and scrolls to `#products`.
- Card code line is always `{code} {skuCode}` (spec), Figma only shows the SKU suffix on the first card.
- Out-of-stock modals hide the "OWNDAYS online store" subtitle since there is nothing to link to.
- Product images use `object-cover` in a fixed-aspect box because the API photos carry white margins.
- Figma "png" exports are JPEGs; they are stored with `.jpg` extensions in `public/`.
- `ABOUT` / `STORES` and the legal links are placeholder anchors, as allowed by the brief.

## Deployment

Any Vercel project works out of the box (no env vars required; `VERCEL_PROJECT_PRODUCTION_URL` is used automatically for OGP URLs).
