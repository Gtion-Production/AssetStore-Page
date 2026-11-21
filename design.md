# Design Guide — Gtion Asset Store Page

Reference: https://yo-star.com/en-us (Yostar corporate site). This document captures the visual language observed there and adapts it for the Asset Store page. Values marked *(observed)* were measured from the reference; the rest are recommendations.

## 1. Design Principles

1. **Art-led.** Large key art/screenshots carry the page; UI chrome stays quiet.
2. **Dark frame, light content.** A black header sits over full-bleed imagery; content sections below are white with black text.
3. **Editorial, uppercase navigation.** Small, uppercase, low-key labels; hierarchy comes from size and contrast, not decoration.
4. **One accent.** A single warm yellow highlights the current/active element.
5. **Section-based, full-width layout.** Each section is a self-contained band (banner → about → products → news).

## 2. Color

| Token | Value | Use |
|---|---|---|
| `--bg-header` | `#000000` *(observed)* | Top navigation bar |
| `--bg-page` | `#FFFFFF` | Content sections |
| `--text-primary` | `#000000` *(observed)* | Body copy, titles on white |
| `--text-on-dark` | `#FFFFFF` *(observed)* | Active nav item, text over hero |
| `--text-muted` | `#848383` *(observed)* | Inactive nav items, secondary text |
| `--accent` | `#FFE656` *(observed, rgb 255 230 86)* | Active tab highlight / underline marker, hero caption bar |
| `--overlay` | `rgba(0,0,0,0.5)` *(observed)* | Scrims behind thumbnails/controls on imagery |
| `--link-default` | `#007AFF` | Inline links only (observed as system blue) |

Rules: no gradients on UI surfaces; imagery provides all colour richness. Use the yellow sparingly (one active element per group).

## 3. Typography

The reference uses custom webfonts: a CJK-friendly sans (`shs*` — Source Han Sans R/B/H), Poppins (`pop*` R/SB), and a Noto Sans-style family (`nsj*` R/B/BL).

For this project use a web-safe equivalent stack:

- **Headings / nav:** `Poppins`, `Noto Sans`, system sans — weights 600–700
- **Body:** `Noto Sans`, `Source Han Sans`, system sans — weight 400
- **Numerals / dates:** Poppins SemiBold

| Role | Size | Weight | Notes |
|---|---|---|---|
| Nav item | 12–13px | Bold | UPPERCASE, no letter-spacing tweaks *(observed 12.2px)* |
| Section title | 22–32px | Black/Bold | Often rendered as an image logo/wordmark |
| Body | 14–16px | Regular | Line-height ~1.6–1.8, generous paragraph spacing |
| Tab label | 12–13px | Bold | UPPERCASE with yellow highlight under active |
| "Read more" link | 12–13px | Regular | Followed by `>>` |
| News date | Large day number + small year/month stacked | SemiBold | e.g. `2026 / 20 / Oct.` |

## 4. Layout & Spacing

- Reference desktop viewport ≈ 1300px wide, content container ≈ 1000px centered *(observed header ≈ 1009px)*.
- Header height ≈ 60px, fixed to the top, black.
- Sections stacked full-width with ample vertical padding (≈ 60–100px). Observed section heights: banner ≈ 570px, about ≈ 835px, products ≈ 530px, news ≈ 450px.
- Use an 8px spacing scale (8, 16, 24, 32, 48, 64, 96).
- Separate desktop and mobile markup/variants (the reference ships distinct `section` and `section_m` blocks) — at ≤ 768px switch to the mobile layout with a hamburger menu.

## 5. Components

### 5.1 Header / Navigation
- Black bar; logo left, nav items right, language selector far right.
- Nav items: uppercase, 12px bold; active = white, inactive = `#848383`; active item has a short yellow underline.
- Language selector: small bordered dropdown, white text on black.

### 5.2 Hero Banner (carousel)
- Full-bleed key art, height ≈ 570px, built as a swiper/carousel with prev/next arrow buttons (circular, semi-transparent dark).
- Left-aligned caption block: game/asset logo plus subtitle, with a vertical yellow bar on its left edge.
- Thumbnail strip (rounded-square icons) bottom-center on a translucent dark pill; the selected thumbnail is highlighted.
- Scroll cue (small mouse icon + thin vertical line) bottom-right.

### 5.3 Section Tabs
- Horizontal uppercase tabs (e.g. `INTRODUCTION | MILESTONES`); active tab gets a yellow highlight swatch behind/under the label.

### 5.4 About / Intro Block
- Plain text on white, multi-paragraph, left-aligned, comfortable measure (~70–80 characters).

### 5.5 Product / Asset Card Section
- Section heading ("Our Products") with a large wordmark/logo of the featured item.
- Short description paragraph, then a primary text-link CTA (`OFFICIAL SITE`).
- Alongside: large illustrative artwork.

### 5.6 News List
- Row layout: date block (year, big day, month) → headline → thumbnail/banner image → `READ MORE >>`.
- Rows separated by whitespace or a hairline; hover raises link contrast.

### 5.7 Footer
- Minimal: `Privacy Policy`, `Terms`, copyright. Muted grey text.

## 6. Imagery

- Anime/illustration key art is the main visual; keep it high-resolution, cropped to a wide aspect (~21:9 in hero).
- Logos/wordmarks are delivered as transparent PNG/SVG, not live text.
- Rounded corners only on small icons/thumbnails (≈ 8–12px); large images stay square-edged.

## 7. Interaction & Motion

- Carousel: auto-advance with fade/slide, manual arrows and thumbnail select.
- Nav: colour transition on hover (grey → white), ~150–200ms.
- Smooth scroll between sections; subtle fade-in on section entry.
- No heavy shadows or bounce effects.

## 8. Adapting to the Asset Store Page

| Reference section | Asset Store equivalent |
|---|---|
| Hero carousel | Featured assets / bundles banner |
| About / Milestones tabs | Store intro / Changelog or Collections tabs |
| Our Products | Featured asset spotlight with CTA (`VIEW ASSET`) |
| News | Latest releases / updates list |
| Language select | Language / region select |
| Footer | Privacy, Terms, licensing links |

Suggested additions not in the reference (needed for a store): search field in the header, category filter chips (use `--accent` outline for selected), asset cards (image, title, price, rating) in a 3–4 column grid, and a clear primary button (black fill, white text, 0–4px radius).

## 9. Accessibility

- Maintain ≥ 4.5:1 contrast: grey `#848383` on white is ~3.9:1 — use only for non-essential text, or darken to `#6B6A6A` for body-size text. Grey on black is fine.
- Yellow `#FFE656` on white fails contrast for text; use it as a background/marker only, never as text colour on white.
- Provide alt text on all art and keyboard-focus outlines on nav, arrows, and thumbnails.

## 10. Tokens (CSS starter)

```css
:root {
  --bg-header: #000;
  --bg-page: #fff;
  --text-primary: #000;
  --text-on-dark: #fff;
  --text-muted: #848383;
  --accent: #ffe656;
  --overlay: rgba(0, 0, 0, 0.5);
  --header-h: 60px;
  --container: 1000px;
  --radius-icon: 10px;
  --font-heading: "Poppins", "Noto Sans", system-ui, sans-serif;
  --font-body: "Noto Sans", "Source Han Sans", system-ui, sans-serif;
}
```
