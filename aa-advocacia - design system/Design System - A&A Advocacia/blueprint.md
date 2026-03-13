# Blueprint Document: A&A Advocacia Especializada

## 1. Global Design System (The Ruleset)

### Color Palette
**Primary Colors (Deep Teal)**
- Primary: `#1a4a5a`
- Primary Dark: `#0d2d38`
- Primary Darker: `#061a21`
- Primary Light: `#2d6a7a`

**Accent Colors (Gold/Metallic)**
- Gold: `#c9a962`
- Gold Light: `#e0c078`
- Gold Dark: `#a68a4a`
- Copper: `#b8956a`
- Bronze: `#9a7a52`

**Neutral Colors**
- White: `#ffffff`
- Text Main: `#1a1a1a`
- Text Muted: `#7a7a7a`
- Background (Light): `#fafbfc`
- Background Section: `#f5f7f8`

**Gradients**
- `--gradient-gold`: `linear-gradient(135deg, #c9a962 0%, #e0c078 25%, #c9a962 50%, #a68a4a 75%, #c9a962 100%)`
- `--gradient-teal`: `linear-gradient(135deg, #1a4a5a 0%, #2d6a7a 50%, #0d2d38 100%)`
- `--gradient-hero`: `linear-gradient(135deg, rgba(13, 45, 56, 0.97) 0%, rgba(6, 26, 33, 0.95) 50%, rgba(13, 45, 56, 0.92) 100%)`

### Typography
- **Headings (Display):** `'Playfair Display', 'Times New Roman', serif;`
- **Body:** `'Inter', sans-serif;`
- **Accent:** `'Crimson Pro', Georgia, serif;`
- **Scale:**
  - Hero: `clamp(2.8rem, 6vw, 5rem)`
  - H1: `clamp(2.2rem, 4.5vw, 3.8rem)`
  - H2: `clamp(1.8rem, 3.5vw, 2.8rem)`
  - Body: `1rem`

### Universal Styles
- **Border Radii:** `4px` (sm), `8px` (md), `12px` (lg), `20px` (xl), `9999px` (full)
- **Shadows:**
  - Light Shadow: `0 8px 24px rgba(13, 45, 56, 0.08)`
  - Gold Glow: `0 8px 32px rgba(201, 169, 98, 0.25)`
- **Textures:**
  - Noise Filter: Handled via `body::before` pointing to a base64 inline SVG filter with `opacity: 0.012` and `pointer-events: none`.
- **Glassmorphism:**
  - Applied to `.glass`: `background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.3);`

---

## 2. The Animation & Interaction Library (The Golden Snippets)

### A. Intersection Observer Reveal Series
- **Location:** All sections, typography, cards.
- **Trigger:** On Scroll via `IntersectionObserver` configured in `script.js` (fires when crossing 15% threshold).
- **Code Snippets:**
  CSS:
  ```css
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal.revealed { opacity: 1; transform: translateY(0); }
  
  .reveal-left { opacity: 0; transform: translateX(-60px); ... }
  .reveal-right { opacity: 0; transform: translateX(60px); ... }
  ```
  HTML:
  ```html
  <div class="hero-badge reveal">...</div>
  ```

### B. Metallic Shine (Button Glare)
- **Location:** `.btn-primary.metallic-shine` (CTAs in Hero and Process sections).
- **Trigger:** CSS `:hover`.
- **Code Snippets:**
  CSS:
  ```css
  .metallic-shine { position: relative; overflow: hidden; }
  .metallic-shine::after {
    content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);
    transform: rotate(30deg) translateX(-100%); transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
  }
  .metallic-shine:hover::after { transform: rotate(30deg) translateX(100%); }
  ```

### C. Parallax Image
- **Location:** `.hero-image` (Right side image in Hero section).
- **Trigger:** Window Scroll Event via Javascript.
- **Code Snippets:**
  Javascript translates Y based on scroll rate:
  ```javascript
  const rate = window.pageYOffset * 0.3;
  heroImage.style.transform = `translateY(${rate}px)`;
  ```

### D. Magnetic Buttons
- **Location:** `.btn-primary` and `.btn-secondary`.
- **Trigger:** Javascript `mousemove` event over the button element.
- **Code Snippets:**
  Calculates cursor position relative to button center and transforms button by `x * 0.1` and `y * 0.1`px. Reverts on `mouseleave`.

### E. 3D Tilt Cards
- **Location:** `.area-card` elements in "Áreas de Atuação".
- **Trigger:** Javascript `mousemove`.
- **Code Snippets:**
  ```javascript
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  ```

### F. Scroll Progress Bar
- **Location:** Fixed to top edge of browser window.
- **Trigger:** Computed on scroll.
- **Code Snippets:**
  Dynamically injected via JS: `linear-gradient(90deg, #c9a962, #e0c078)` with width adjusted iteratively via `scrollPercent`.

---

## 3. Step-by-Step Layout Architecture

### Section 1: The Navigation (`.header`)
- **Structure:** `position: fixed` to top. Height is 80px. Background is `rgba(255, 255, 255, 0.95)` with `backdrop-filter: blur(8px)`.
- **Components:** Left logo block layout flex. Middle nav `.nav-desktop` spaced closely with `gap: var(--space-xl)`. Right side WhatsApp CTA button (`.btn-header-cta`).
- **Behavior:** Features hide-on-scroll-down behavior by tracking `lastScroll`. Translates `-100% Y` to hide. Translates `0` to show on scroll up.

### Section 2: The Hero
- **Structure:** Two-column split layout using `flex` (desktop via `.hero-grid`) or grid layout. Padding top compensates for 80px header. Background is `--color-primary-darker`.
- **Text side:** Stacked elements (Badge -> H1 -> P -> Button). Elements fade-up via `.reveal` class.
- **Image handling:** Parallax logic in Javascript handles position. In Desktop `.hero-image-wrapper`, in Mobile `.hero-image-mobile`. Mobile version inserts image immediately under the CTA and borders it with gold shadow.

### Section 3: Áreas de Atuação
- **Structure:** Grid layout `.areas-grid` (CSS likely `display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));`).
- **Cards:** `.area-card` with hover tilt effect. SVG icons inside use inline `<linearGradient>` with the specific gold colors to match brand aesthetics.

### Section 4: Como Funciona
- **Structure:** Ordered list `.processo-steps` with `.processo-step` items. Includes numbers styled boldly alongside the text payload in a flex layout.

### Section 5: Sobre
- **Structure:** Split `.sobre-grid`. Left image (`.sobre-image-wrapper` with `.reveal-left`) / Right Content (`.sobre-content`). Includes small `.sobre-badges` grid at bottom illustrating specialized attributes.

### Section 6: Diferenciais
- **Structure:** Four grid sections `.diferenciais-grid` with `.diferencial-item`.

### Section 7: FAQ
- **Structure:** Accordion `.faq-list`. Javascript controls interactions.
- **Interaction:** On click of `.faq-question`, toggle `.active` class on `.faq-item`. Javascript explicitly sets `max-height` matching `scrollHeight` in pixels so CSS transition occurs smoothly. `aria-expanded` attributes updated dynamically.

### Section 8: Footer
- **Structure:** Four column `.footer-grid` for desktop (Brand, Quick Links, Contacts, Maps).
- **Sub-footer:** Centered credits with AG5 Agência attribution and localized terms links.

---

## 4. Special Behaviors & Scrollytelling

- **Scroll Behavior:** Built-in `html { scroll-behavior: smooth; }` is used. Overridden via javascript explicitly intercepting `<a href="#...">` elements, applying offset logic `window.scrollTo({ top: offsetPosition, behavior: 'smooth' })` to subtract the 80px header height dynamically.
- **Fixed Progress Indicator:** Top of the viewport.
- **Floating WhatsApp:** Constant anchor bottom-right using absolute position mapping.

---

## 5. Media Queries & Responsiveness

- **Key Breakpoint (max-width: 767px):**
  - **Hero Section:** Padding changes (`padding-bottom: 24px`), text gets text shadows for legibility. The Parallax Desktop `.hero-image` is hidden by hiding `.hero-image-wrapper`. The mobile fallback `.hero-image-mobile` block is displayed (`display: block`) allowing a smaller, optimized layout under the call-to-action button.
  - **Menu Toggle:** Desktop `.nav-desktop` receives `.hide-mobile`. Top navigation converts to hamburger toggle `.menu-toggle`. When toggled active, an `.mobile-overlay` dims the screen, and `.mobile-menu` sliding side panel eases in (`right: 0%`).
  - **Elements:** `.scroll-indicator` explicitly hidden via `display: none`. Desktop specific classes appended `.hide-desktop`.
