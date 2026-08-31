# MUREC — Legacy in Motion

An immersive, cinematic redesign of the [MUREC](https://murec.com) homepage. Built as a premium frontend developer assignment — inspired by the interaction philosophy of luxury editorial sites, with an original MUREC visual identity.

## Tech Stack

- **Next.js 16** · **TypeScript** · **Tailwind CSS v4**
- **GSAP + ScrollTrigger** — pinned horizontal storytelling, scene transitions
- **Lenis** — smooth scroll integrated with ScrollTrigger
- **Lucide React** — icons

## Experience Highlights

- **Preloader** — minimal MUREC intro with clip-path exit
- **Cinematic hero** — letter convergence animation, video scale settle, parallax scroll exit
- **Legacy** — full-viewport editorial layout with oversized off-grid `78+`
- **Principles & Philosophy** — pinned horizontal scroll with live progress indicator
- **Collection** — pinned media expansion scene transition
- **Associations** — dual-speed logo marquee
- **Partners** — editorial full-viewport slider with clip-path transitions
- **Contact** — oversized typographic finale with magnetic CTA hover
- **Mobile** — intentionally vertical layouts, no horizontal pin on small screens
- **`prefers-reduced-motion`** — disables preloader, cursor, Lenis, and pinned sections

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Production

```bash
npm run build
npm start
```

Deploy to Vercel with zero config.

## Structure

```
src/
├── app/                    # Layout, globals, page entry
├── components/
│   ├── motion/             # Preloader, PageExperience, scroll progress
│   ├── navigation/         # Navbar, MenuOverlay
│   ├── sections/           # All cinematic sections
│   └── ui/                   # ArrowLink, MagneticButton, SectionMeta
├── data/murec.ts           # Content & asset paths
├── hooks/                  # useReducedMotion, useMediaQuery
└── lib/gsap.ts             # GSAP + ScrollTrigger registration
public/
├── fonts/Gotu-Regular.woff2
└── images/                 # MUREC media assets
```

## Content

All copy, logos, partner quotes, and media are sourced from [murec.com](https://murec.com). Update `src/data/murec.ts` to change content or asset paths.
