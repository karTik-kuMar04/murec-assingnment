# MUREC | Frontend Assignment

A modern, immersive redesign of the MUREC homepage, built as part of a Frontend Developer assignment. The project uses MUREC's original content, branding, and media assets while drawing visual and interaction inspiration from the [Timeless](https://timeless.eu) website.

---

## Overview

This project is a full reimagining of the MUREC digital experience — dark, cinematic, and editorial in tone. It is built from the ground up with a focus on motion design, storytelling through scroll, and premium visual presentation, while maintaining full responsiveness across desktop, tablet, and mobile.

---

## Features

- **Dark Cinematic UI** — deep architectural colour palette, grain overlays, and precise typography
- **Smooth Scrolling** — powered by Lenis for buttery-smooth, physics-based scroll behaviour
- **GSAP Animations & ScrollTrigger** — entrance animations, parallax effects, and scroll-driven transitions
- **Horizontal Scroll Storytelling** — pinned horizontal panels for Philosophy and Principles sections
- **Fullscreen Video Backgrounds** — cinematic autoplay backgrounds with controlled playback rates across multiple sections (Hero, Legacy, Principles, Philosophy, Contact)
- **Interactive Menu** — full-screen overlay navigation with staggered link animations
- **Responsive Design** — dedicated desktop (horizontal scroll) and mobile (vertical stack) layouts
- **Accessibility Considerations** — `prefers-reduced-motion` support disables GSAP animations for users who opt out
- **Performance Considerations** — `preload="none"` on all background videos, lazy image loading, and `will-change` hints on GPU-composited layers

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework (App Router) |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [GSAP 3](https://gsap.com/) + `@gsap/react` | Animations and ScrollTrigger |
| [Lenis](https://lenis.darkroom.engineering/) | Smooth scroll engine |
| [Lucide React](https://lucide.dev/) | Icon library |

---

## Getting Started

### Prerequisites

- Node.js `18+`
- npm

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Build

```bash
# Create an optimised production build
npm run build

# Start the production server
npm run start
```

---

## Project Structure

```
src/
├── app/                  # Next.js App Router (layout, page, global CSS, favicon)
├── components/
│   ├── sections/         # Full-page sections (Hero, Legacy, Principles, Collection, Philosophy, Contact, Footer…)
│   ├── navigation/       # Navbar and full-screen menu overlay
│   ├── ui/               # Reusable UI primitives (ArrowLink, SectionMeta, MagneticButton…)
│   ├── motion/           # Motion-specific components (HorizontalProgress bar, Preloader…)
│   └── providers/        # Lenis SmoothScrollProvider
├── data/
│   └── murec.ts          # Single source of truth for all site copy, links, and media paths
├── hooks/                # Custom React hooks (useVideoInView, useReducedMotion, useMediaQuery…)
└── lib/
    ├── gsap.ts           # Centralised GSAP + ScrollTrigger registration
    └── animations/       # Reusable animation factories (horizontalScroll)
```

---

## Design Inspiration

The visual language of this project is inspired by the immersive, cinematic, and editorial qualities of the [Timeless](https://timeless.eu) website — in particular its use of dark architectural tones, large-scale display typography, and scroll-driven storytelling. The layout, component architecture, and implementation are entirely original and built specifically around MUREC's brand and content.

---

## Credits / Content

All content — including copy, imagery, logos, and video assets — is sourced from the [MUREC website](https://murec.com) and used solely for the purpose of this frontend assignment.

---

## Live Demo

🔗 **[murec-assingnment.vercel.app](https://murec-assingnment.vercel.app/)**

---

## Submission

This project was created as part of the **Frontend Developer assignment** for Propacity. It demonstrates modern frontend engineering practices including motion design, scroll-driven UX, and responsive component architecture using the Next.js + GSAP + Lenis stack.
