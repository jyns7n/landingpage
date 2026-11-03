# OWNDAYS x MELLER Product Listing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive, pixel-accurate OWNDAYS x MELLER sunglasses listing page (grid, product detail modal, "HOW TO STYLE THEM" carousel) from the Figma design and the products API.

**Architecture:** Next.js App Router (TypeScript). `app/page.tsx` is a Server Component that fetches `products.json` (ISR, `revalidate: 3600`) and passes typed `Product[]` to client islands. A single `ModalProvider` context holds `{ product, skuId } | null`, opened from cards and from carousel "+" buttons. Pure logic (price, URLs, color mapping, stock) lives in `lib/` and is unit-tested; components are tested with Testing Library.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript strict, Tailwind CSS v4, `next/font` (local Favorit + GT America, Google Noto Sans JP), `next/image`, Vitest + @testing-library/react, Playwright (visual/responsive check), Vercel.

**Spec:** https://github.com/frontend-otm/api/blob/main/meller/FRONTEND_TEST.md (and PRODUCTS_README.md in the same folder). Figma: https://www.figma.com/design/zzDDFb5qyG3or04QVem15s/3---OWNDAYS-x-MELLER (file key `zzDDFb5qyG3or04QVem15s`). Local copies are fetched in Task 1 into `docs/spec/`.

## Global Constraints

- Breakpoint: desktop `>=1024px` (Tailwind `lg`), mobile `<1024px`. Desktop = 3-column grid, text nav, 616px right side panel; mobile = 1 column, hamburger, full-screen modal.
- Image URL = `https://storage.owndays.com/storage/` + `path`. Swatch pattern image path (`colors[].path`) uses the same base.
- Nav: background `#F26A2F` (confirm from Figma), Favorit Bold 15px uppercase white, tracking 0.7px, gap 50px, links ABOUT / PRODUCTS / STORES. Logo 351x52 desktop, 240x16 mobile; padding 25px / 23px vertical. Sticky.
- Fonts: `"Noto Sans JP"`; `"Favorit"` 400/500/700 from `https://storage.owndays.com/meller/fonts/Favorit/Favorit-{Regular,Medium,Bold}.woff2`; `"GT America Trial Cm"` 500/700/900 from `https://storage.owndays.com/meller/fonts/GTAmericaTrial/GTAmericaTrial-{Md,CmBl,CmBd}.woff2`.
- Card: ~422x452 desktop (17px gap), ~357x383 mobile. Swatch 38x38 circle, 3px gap, max 4 shown. Grid price `¥7,800+tax`; modal price `¥7,800 税込`.
- Modal: 616x1012 right panel desktop; close icon 42x42; carousel slide ~420x298 with 3 visible; CTA subtitle `OWNDAYSオンラインストアに移動します`.
- CTA href: `https://www.owndays.com/jp/ja/products/{product.code}?sku={sku.id}`. Out of stock (`selling_setting.in_stock === 0`): disabled, text `OUT OF STOCK`. Hover: white fill, dark border, dark text.
- Style Them item ~405x611 desktop / ~326x492 mobile, "+" button 70x70 bottom-right. Footer "ALL ITEMS" button 428x70.
- Nice-to-have, in scope: modal open/close animation, lazy images, ESC to close + keyboard/tab access, OGP meta (1200x630).
- Per user CLAUDE.md: any raster asset not available from Figma/API is generated with `codex exec` (image_gen), never hand-drawn SVG placeholders.

## Review Focus

- `in_stock: 0` (CHAUEN) must show a disabled `OUT OF STOCK` button in the modal and never link out.
- Color with `hex_code: null` + `path` (Brown Demi) must render the pattern image, not a blank/transparent circle.
- SKU with two colors (KESSIE C4, NAYAH C3/C4: Black + Orange/Light Blue) must render a split two-tone swatch and a joined chip label, not drop the second color.
- SKU image counts differ (3-6): switching SKU resets the carousel to slide 1 and never shows stale images; products with only 2 SKUs render fine.
- API fetch failure / empty `data` must show an error state, not crash the build or render a blank page; modal must lock body scroll, close on ESC and backdrop, and restore focus to the trigger.

---

### Task 1: Scaffold, fonts, tokens, Figma extraction

**Files:**
- Create: Next.js app in repo root (`app/`, `package.json`, `tsconfig.json`), `vitest.config.ts`, `vitest.setup.ts`, `app/fonts.ts`, `app/globals.css`, `docs/spec/*.md`, `public/fonts/` (downloaded woff2), `public/brand/` (logo, hamburger, close, hero assets exported from Figma), `README.md`
- Test: `tests/smoke.test.tsx`

**Interfaces:**
- Produces: CSS tokens in `app/globals.css` under Tailwind `@theme` (`--color-brand`, `--color-ink`, `--font-favorit`, `--font-gt`, `--font-noto`, breakpoint `lg: 1024px`); `app/fonts.ts` exports `favorit`, `gtAmerica`, `notoSansJp` (`next/font` objects); `docs/spec/figma-tokens.md` listing every color/size/spacing/radius used by later tasks.

- [ ] **Step 1: Authenticate Figma.** User runs `/mcp` → "claude.ai Figma". Then use the Figma MCP (`get_design_context` / `get_screenshot` for the desktop and mobile frames, `get_metadata` for node tree) to write `docs/spec/figma-tokens.md` (colors, hero height ~633px, type scale, radii, shadows, modal/card spacing) and export logo, hamburger, close, hero decor and the Style Them photos into `public/brand/` and `public/style/`. If Style Them photos cannot be exported, generate them with `codex exec` per CLAUDE.md.
- [ ] **Step 2: Scaffold.** `npx create-next-app@latest . --ts --tailwind --app --eslint --no-src-dir --import-alias "@/*"`; add `vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`; add `"test": "vitest run"`.
- [ ] **Step 3: Write failing smoke test** `tests/smoke.test.tsx`: render `<Home />`-free placeholder asserting `document.body` exists and `jest-dom` matchers load (`expect(document.body).toBeInTheDocument()`).
- [ ] **Step 4: Run** `npx vitest run` — expected FAIL (no config), then add `vitest.config.ts` (jsdom, `@` alias, setup file) and re-run — expected PASS.
- [ ] **Step 5: Fonts + tokens.** Download woff2 files into `public/fonts/`, declare with `next/font/local` in `app/fonts.ts` (weights per Global Constraints, `display: "swap"`), `Noto_Sans_JP` from `next/font/google`; apply variables on `<html>` in `app/layout.tsx`; fill `@theme` with Figma values.
- [ ] **Step 6: Verify** `npm run build` succeeds. Expected: exit 0.
- [ ] **Step 7: Commit** `git init` (not yet a repo), `.gitignore` from scaffold, `git commit -m "chore: scaffold next app, fonts, tokens"`.

### Task 2: Types and data layer

**Files:**
- Create: `lib/types.ts`, `lib/products.ts`, `lib/format.ts`, `lib/product-utils.ts`
- Test: `tests/lib/format.test.ts`, `tests/lib/product-utils.test.ts`, `tests/lib/products.test.ts`, `tests/fixtures/products.json` (copy of the live API response, trimmed to ADISA, CHAUEN, KESSIE)

**Interfaces:**
- Produces:
  - `type Product`, `Sku`, `SkuColor`, `ProductsResponse` mirroring PRODUCTS_README (only fields used: `product.{id,code,model_name}`, `localization.description`, `frame_types[].code`, `selling_setting.{price,in_stock}`, `skus[].{id,code,colors[],images[]}`, `colors[].{name,hex_code,path,localizations[]}`).
  - `formatPriceGrid(price: number): string` → `"¥7,800+tax"`; `formatPriceModal(price: number): string` → `"¥7,800 税込"`.
  - `imageUrl(path: string): string` (base URL prepend).
  - `isOutOfStock(p: Product): boolean`; `storeUrl(p: Product, sku: Sku): string`; `sortedImages(sku: Sku): Image[]` (by `order`); `swatchStyle(colors: SkuColor[]): {kind:"solid";hex:string}|{kind:"image";url:string}|{kind:"split";hexes:[string,string]}`; `chipLabel(sku: Sku): string` (sku.code, e.g. `C4`); `colorLabel(sku: Sku, lang: "ja"|"en"): string` (names joined with ` × `); `frameLabel(p: Product): string` (`"SQUARE"`).
  - `getProducts(): Promise<Product[]>` — fetches `https://api-one-alpha-60.vercel.app/meller/products.json` with `next: { revalidate: 3600 }`, throws `ProductsError` on non-ok, `success:false`, or empty data.

- [ ] **Step 1: Write failing tests.** `format.test.ts`: `formatPriceGrid(7800) === "¥7,800+tax"`, `formatPriceModal(7800) === "¥7,800 税込"`. `product-utils.test.ts`: `imageUrl("products/a.webp") === "https://storage.owndays.com/storage/products/a.webp"`; `isOutOfStock(CHAUEN) === true`, ADISA false; `storeUrl(ADISA, C1) === "https://www.owndays.com/jp/ja/products/ML2001D-6S?sku=9445"`; `swatchStyle` returns `image` for Brown Demi, `solid #000000` for Black, `split ["#000000","#ef7f1c"]` for KESSIE C4; `sortedImages` orders by `order`; `frameLabel` → `"SQUARE"`. `products.test.ts`: mock `fetch` — ok payload returns 3 products; 500 rejects `ProductsError`; `{success:true,data:[]}` rejects.
- [ ] **Step 2: Run** `npx vitest run tests/lib` — expected FAIL (modules missing).
- [ ] **Step 3: Implement** the signatures above; `getProducts` uses `fetch` with ISR option.
- [ ] **Step 4: Run** same command — expected PASS.
- [ ] **Step 5: Commit** `feat: typed product data layer`.

### Task 3: Header and mobile menu

**Files:**
- Create: `components/Header.tsx` (client), `components/MobileMenu.tsx`, `components/Logo.tsx`
- Test: `tests/components/Header.test.tsx`

**Interfaces:**
- Produces: `<Header />` (no props). Nav items constant `NAV_ITEMS = [{label:"ABOUT",href:"#about"},{label:"PRODUCTS",href:"#products"},{label:"STORES",href:"#stores"}]` exported from `components/nav-items.ts`.

- [ ] **Step 1: Failing tests:** desktop links ABOUT/PRODUCTS/STORES present with correct hrefs; hamburger button (`aria-label="Open menu"`, `aria-expanded=false`) opens a dialog containing the 3 links; clicking a link closes it; close button and ESC close it; body scroll locked while open.
- [ ] **Step 2: Run** `npx vitest run tests/components/Header.test.tsx` — expected FAIL.
- [ ] **Step 3: Implement** sticky orange header per Global Constraints; desktop links `hidden lg:flex`, hamburger `lg:hidden`; full-screen overlay menu with brand/dark background, white text; links use `scroll-smooth` anchors and `scroll-mt` equal to header height.
- [ ] **Step 4: Run** — expected PASS.
- [ ] **Step 5: Commit** `feat: header with mobile menu`.

### Task 4: Hero and section titles

**Files:**
- Create: `components/Hero.tsx`, `components/SectionTitle.tsx`
- Test: `tests/components/Hero.test.tsx`

**Interfaces:**
- Produces: `<Hero />`; `<SectionTitle lines={string[]} />` (highlight/underline treatment from Figma, reused by "PRODUCTS", "HOW TO" / "STYLE THEM").

- [ ] **Step 1: Failing test:** Hero renders an `h1` "PRODUCTS" and `SectionTitle` renders each line in order.
- [ ] **Step 2: Run** `npx vitest run tests/components/Hero.test.tsx` — expected FAIL.
- [ ] **Step 3: Implement** dark band (~633px desktop, scaled mobile per Figma) with GT America Cm 900 display type and highlight treatment from `figma-tokens.md`.
- [ ] **Step 4: Run** — expected PASS. **Step 5: Commit** `feat: hero and section title`.

### Task 5: Swatch, ProductCard, ProductGrid, modal context

**Files:**
- Create: `components/Swatch.tsx`, `components/ProductCard.tsx`, `components/ProductGrid.tsx`, `components/ModalProvider.tsx`
- Test: `tests/components/Swatch.test.tsx`, `tests/components/ProductCard.test.tsx`

**Interfaces:**
- Consumes: Task 2 `swatchStyle`, `imageUrl`, `formatPriceGrid`, `sortedImages`.
- Produces:
  - `<Swatch colors: SkuColor[]; selected: boolean; label: string; onSelect(): void />` (38x38, `button role="radio"` with `aria-label`).
  - `<ProductCard product: Product />` holding local `skuId` state (default `skus[0].id`); image = first image of selected SKU; shows model name, `` `${code} ${sku.code}` ``, price, max 4 swatches (overflow → `+N` text); clicking swatch changes image only; clicking the card body calls `openModal(product, skuId)`.
  - `ModalProvider` + `useProductModal(): { state: {product: Product; skuId: number} | null; open(p: Product, skuId?: number): void; close(): void; setSku(id: number): void }`.
  - `<ProductGrid products: Product[] />` — `grid grid-cols-1 lg:grid-cols-3 gap-[17px]`.

- [ ] **Step 1: Failing tests:** Swatch renders solid `background-color`, pattern `background-image` url, and two-tone for split; ProductCard shows `ADISA`, `ML2001D-6S C1`, `¥7,800+tax`; clicking the C3 swatch updates the `img` src to SKU C3's first image and the code to `ML2001D-6S C3` and does NOT open the modal; clicking the card calls `open` with `(product, activeSkuId)`; product with 4 SKUs shows 4 swatches, a fixture with 5 shows 4 + `+1`.
- [ ] **Step 2: Run** `npx vitest run tests/components` — expected FAIL.
- [ ] **Step 3: Implement** with `next/image` (`sizes="(min-width:1024px) 33vw, 100vw"`, first row `priority`, rest lazy), card rounded per Figma; memoize `ProductCard` (`React.memo`) so SKU switching re-renders one card.
- [ ] **Step 4: Run** — expected PASS. **Step 5: Commit** `feat: product grid and cards`.

### Task 6: Product detail modal

**Files:**
- Create: `components/ProductModal.tsx`, `components/ImageCarousel.tsx`, `components/SkuChips.tsx`, `components/OnlineStoreButton.tsx`, `hooks/useBodyScrollLock.ts`, `hooks/useFocusTrap.ts`
- Test: `tests/components/OnlineStoreButton.test.tsx`, `tests/components/ProductModal.test.tsx`

**Interfaces:**
- Consumes: Task 5 `useProductModal`; Task 2 utils.
- Produces: `<OnlineStoreButton href: string; disabled: boolean />` (anchor `target="_blank" rel="noopener noreferrer"`; when disabled renders `<button disabled aria-disabled>` text `OUT OF STOCK` with grey style); `<ImageCarousel images: Image[]; alt: string; resetKey: number />` (CSS scroll-snap horizontal scroller, `resetKey` change scrolls to 0); `<SkuChips skus: Sku[]; value: number; onChange(id: number): void />`; `<ProductModal />` rendered once in layout/page reading context.

- [ ] **Step 1: Failing tests.** Button: enabled renders link with `storeUrl` and text `ONLINE STORE`; `product.in_stock===0` renders disabled `OUT OF STOCK`, no `href`. Modal (CHAUEN fixture + ADISA fixture): opens with model name heading, `P/No. ML2001D-6S C1`, `TYPE SQUARE`, `PRICE ¥7,800 税込`, description, subtitle `OWNDAYSオンラインストアに移動します`; clicking chip C2 updates P/No. to `... C2`, button href sku id to 9446, and carousel images to C2's 3 images; ESC, close button and backdrop click close; body has scroll-lock while open and restored after; focus returns to trigger; CHAUEN shows `OUT OF STOCK`.
- [ ] **Step 2: Run** `npx vitest run tests/components/ProductModal.test.tsx tests/components/OnlineStoreButton.test.tsx` — expected FAIL.
- [ ] **Step 3: Implement** panel: desktop fixed right 616px full height with slide-in + backdrop fade (transform/opacity transition 300ms, `prefers-reduced-motion` respected); mobile full-screen. `role="dialog" aria-modal aria-labelledby`. Carousel: `overflow-x-auto snap-x`, slides ~420x298 with 3 visible on desktop, 1.2 visible on mobile; images `loading="lazy"`. Chip label = `colorLabel`/code per spec; active chip distinct.
- [ ] **Step 4: Run** — expected PASS. **Step 5: Commit** `feat: product detail modal with sku switching`.

### Task 7: "HOW TO STYLE THEM" carousel

**Files:**
- Create: `components/StyleThem.tsx`, `lib/style-items.ts`
- Test: `tests/components/StyleThem.test.tsx`

**Interfaces:**
- Consumes: `useProductModal`, `SectionTitle`.
- Produces: `STYLE_ITEMS: { id: string; image: string; productCode: string; skuCode?: string; alt: string }[]` (mapping each Figma look to a product; images in `public/style/`); `<StyleThem products: Product[] />`.

- [ ] **Step 1: Failing test:** renders titles `HOW TO` / `STYLE THEM`; one item per `STYLE_ITEMS` entry with a `+` button (`aria-label="View ADISA"`); clicking it calls `open` with the matching product and sku; items whose `productCode` isn't in `products` render no `+` button.
- [ ] **Step 2: Run** — expected FAIL. **Step 3: Implement** free-scroll `overflow-x-auto snap-x`, hidden scrollbar, items overflow viewport (left padding aligned to container), 405x611 desktop / 326x492 mobile, 70x70 "+" bottom-right; drag-to-scroll with mouse optional via pointer events. **Step 4: Run** — PASS. **Step 5: Commit** `feat: style them carousel`.

### Task 8: Footer, page assembly, SEO, error state

**Files:**
- Create: `components/Footer.tsx`, `components/ErrorState.tsx`, `app/page.tsx`, `app/layout.tsx` (modify), `app/opengraph-image` or `public/og.png` (1200x630 from API/Figma)
- Test: `tests/components/Footer.test.tsx`, `tests/app/page.test.tsx`

**Interfaces:**
- Consumes: everything above; `getProducts()`.
- Produces: `app/page.tsx` (async Server Component) composing `Header, Hero, ProductGrid (#products), StyleThem, Footer` inside `ModalProvider` with one `ProductModal`; `export const metadata` with title, description, OGP, `lang="ja"`.

- [ ] **Step 1: Failing tests:** Footer has `ALL ITEMS` link (428x70) and nav links; page test with mocked `getProducts` renders 8 cards; rejected `getProducts` renders `ErrorState` with a retry link instead of throwing.
- [ ] **Step 2: Run** `npx vitest run tests/app tests/components/Footer.test.tsx` — expected FAIL. **Step 3: Implement.** **Step 4: Run** full `npx vitest run` — expected all PASS. **Step 5: Commit** `feat: assemble page, footer, seo`.

### Task 9: Pixel/responsive QA, performance, README, deploy

**Files:**
- Create: `playwright.config.ts`, `e2e/responsive.spec.ts`, `README.md` (complete), `docs/qa/` screenshots
- Modify: any component needing pixel fixes

**Interfaces:** none new.

- [ ] **Step 1: Write Playwright spec** at viewports 1440, 1024, 768, 390: grid column count (3 at >=1024, 1 below), hamburger visible only <1024, card click opens modal then ESC closes, chip click changes carousel image, CHAUEN modal shows `OUT OF STOCK`, Style Them scrolls horizontally (`scrollWidth > clientWidth`), no horizontal page overflow (`document.documentElement.scrollWidth <= innerWidth`).
- [ ] **Step 2: Run** `npx playwright test` against `npm run build && npm start` — expected PASS; fix failures.
- [ ] **Step 3: Pixel pass.** For desktop (1440) and mobile (390) screenshot each section and compare side by side with Figma screenshots (Figma MCP `get_screenshot`); adjust spacing, font sizes, radii until visually matching; save pairs to `docs/qa/`.
- [ ] **Step 4: Performance check.** `npx lighthouse http://localhost:3000 --preset=desktop` and mobile; target Performance >= 90, no CLS from images (all `next/image` with sizes), LCP image `priority`. Add `images.remotePatterns` for `storage.owndays.com` in `next.config.ts`.
- [ ] **Step 5: README** with: stack, `npm i`, `npm run dev`, `npm test`, `npm run build`, architecture (data flow, modal context, folder map), design decisions, assumptions (Style Them imagery source, `lang`), Vercel link.
- [ ] **Step 6: Deploy** to Vercel (`vercel --prod` or GitHub import); put URL in README; confirm production URL loads 8 products. Push to a GitHub repo and share the link.
- [ ] **Step 7: Commit** `chore: qa, docs, deploy`.

---

## Self-Review

- **Spec coverage:** responsive grid (T5), nav + hamburger + overlay (T3), cards with image/name/code/swatches/price (T5), 8 products from JSON (T2/T8), hex vs pattern swatch (T2/T5), modal with all fields + close (T6), SKU switching incl. card-level (T5/T6), carousel (T6), Style Them with "+" (T7), ONLINE STORE hover/disabled (T6), price formats (T2), footer ALL ITEMS (T8), nice-to-haves animation/lazy/ESC/OGP (T6/T5/T8), README/deploy (T9).
- **Type consistency:** `open(product, skuId)`, `swatchStyle`, `storeUrl`, `sortedImages`, `colorLabel` names are identical across T2, T5, T6, T7.
- **Known unknowns:** exact colors/spacing/Style Them photos and look→product mapping come from Figma (Task 1 blocks on Figma auth); if Figma stays unavailable, token values fall back to the spec's numbers and Style Them images are generated via Codex.
