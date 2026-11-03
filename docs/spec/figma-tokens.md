# Figma tokens (file fYj76hYRs3tzwETTxkKW7Q, page "Products")

Frames: desktop `5271:2426` (1440x3541), desktop modal `5271:2637`, mobile `5271:2764` (390x5193), mobile modal `5271:2861`, mobile menu `5271:2990`, button states `5271:3053`, OGP `5271:3014`, meta copy `5271:3077`. Reference screenshots in `docs/spec/figma/*.png`; generated code dump in `docs/spec/figma/desktop-context.tsx.txt`.

> The Figma design wins over FRONTEND_TEST.md where they differ (e.g. brand orange, page background, footer, hover colors).

## Color
- `--orange` **#ff6723** (nav is transparent over the hero photo, NOT a solid orange bar; page background below hero is orange)
- black `#000`, white `#fff`; card image bg `#f7f7f7` (photo blended `mix-blend-multiply`); modal top panel bg `#f0f0f0`.
- ONLINE STORE: default orange `#ff6723` text white; hover dark orange (~`#963d15`, Figma "After hover"); disabled `#d9d9d9` text white-ish. ALL ITEMS: black → hover `#535353`.
- Footer: black bg, orange text/lines.

## Type
- Display (titles, product names, modal name): **GT America Trial Cm** Bold(700, `CmBd`) for section titles; Black/Bl (`CmBl`) for card product names (52.716px, lh 67.5px, tracking 1.0543px).
- Price: GT America Md 23.467px + "+tax" Favorit Medium 15.815px, tracking 0.8634px.
- Code line: Favorit Regular 16px, tracking 0.6982px.
- Nav: Favorit Medium (ABOUT) / Bold (PRODUCTS, STORES) 15.071px, lh 20.095, tracking 0.7033px, uppercase, white.
- Hero "PRODUCTS": GT America Cm Bd 110px/110px orange on black bar (412x78, offset left 5px top 16px, container 412x114).
- "HOW TO" / "STYLE THEM": Cm Bd 160px/160px orange over black bar (422x112).
- Footer links 13px/20px tracking 0.7px; big nav 18px Bold; copyright 12px Regular; ONLINE STORE footer 21px Medium.

## Layout (desktop 1440)
- Header: container 1300 wide at x=70, py 25, logo 351x52, nav gap 50. Transparent, overlays hero.
- Hero: 633px tall photo (`public/brand/hero.png`, scaled 341% height, top -115%) + grain overlay `hero-grain.png` opacity .3, bg-size 1335x869; 1px black line under hero.
- Grid: x=70, y=763, width 1300, `flex-wrap gap 17px`, card 422x452, white, first/hovered card has 2px black border; image box left 4.16% right 4.42% top 14.75px aspect 472/359; name+code block at inset 73.12%/4.39%/8.37%/4.16% (name left, swatches+price right, gap 15px); swatches 38px, gap 3px.
- Style section: title "HOW TO" top 2303 left 70; "STYLE THEM" top 2443 left ~; black line y=2525; photo strip y=2526 height 613, photos ~405x611 flush (no gap), "+" tile 70x70 orange bg bottom-right (icon 47px).
- Footer: height 400, black, 1px orange lines; left column nav (ABOUT/PRODUCTS/STORES 18px bold, gap 20), instagram icon, bottom row links 13px; right column (x≥64.67%) ONLINE STORE (cart icon) + OWNDAYS.COM.
- Modal desktop: panel 616x1012 at right (x=824), top-left radius ~30; backdrop blurred page (blur + dark overlay). Top region #f0f0f0 height ~499 w/ name (orange GT America Cm Bd ~32px) top-left, X (orange, 42px) top-right; carousel centered with neighbours peeking; chips centered below (pill, 1px black border, active = black fill white text, Favorit Medium ~12px uppercase). Bottom region black: rows P/No., TYPE, PRICE (label x=887, value x=983, white, Favorit ~15px, row pitch 34px), description white 15px lh 30px, ONLINE STORE button 373x54 pill orange, subtitle 12px white.
- Mobile (390): header 358 wide at x=16, py 23, logo 240x16, hamburger; hero ~677 tall; cards 357 wide stacked (gap ~17), page side padding 17; style photos 326x492; footer accordion-like rows (ABOUT › PRODUCTS › STORES ›), ONLINE STORE, links, copyright.
- Mobile modal: card inset 17px from edges, rounded 20px+ corners; mobile menu: black rounded panel inset 17px, orange links 18px, secondary links 12px.

## Assets exported (public/)
`brand/collab-logo.svg, hero.png, hero-grain.png, plus.svg, cart.svg, external.svg, instagram.svg`; `style/look-01..10.png` (order as in Figma); fonts in `public/fonts/`.

## Rulings
- Style Them photo → product mapping not in Figma: look N opens product (N-1) mod 8.

## Modal (desktop, exact — node 5271:2729; coordinates relative to panel left=824)
- Panel 616x1012 black, `rounded-l-[30px]`. Top grey area `#f0f0f0` 616x499 `rounded-tl-[20px]`.
- Name: GT America Cm Bl 35.833px/80.635px tracking 1.2593px orange, left 27px top 0. Close icon 42x42 at left 559px top 15px (orange cross svg `gridicons:cross`).
- Carousel: top 51px, 616 wide, `overflow-clip`, slides 420.868x298 with `-10px` gap (negative margin), images `object-contain mix-blend-multiply`, centered so neighbours peek.
- Chips: pill, 1px black border, Favorit Medium ~12px uppercase, centered under carousel at y≈356–382; active black fill/white text.
- Content block left 61px (x=885), top 578px, width 494, gap 30px: info rows (Favorit Medium 14px/19.872px, tracking .6323px, row gap 14px, value column at +95.75px, price `¥7,800` 14px + `税込` 11px) **above**... order in Figma: info rows on top (y=578) then description (Noto Sans JP Medium 14px/30px, w 494, starts 111px below rows top) then button group.
- Button 373x54 `rounded-[60px]` orange, label Favorit Bold 16px white tracking .6323; subtitle Noto Sans JP Medium 12px/30px white centered; gap 10px.
- Backdrop: page behind is blurred and darkened.
