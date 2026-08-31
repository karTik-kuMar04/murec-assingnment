export const navigation = {
  items: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "https://murec.com/about.php" },
    { label: "Our Legacy", href: "https://murec.com/legacy.php" },
    { label: "The MUREC Collection", href: "https://murec.com/Forest-Walk.php" },
    { label: "Careers", href: "https://murec.com/career.php" },
    { label: "Media", href: "https://murec.com/news.php" },
    { label: "Blogs", href: "https://murec.com/Blog.php" },
    { label: "Contact Us", href: "https://murec.com/contact.php" },
  ],
} as const;

export const hero = {
  video: "/images/home.mp4",
  poster: "/images/murec.webp",
  logo: "/images/murec.png",
  tagline: "Madhusudan Urban Real Estate Collection",
  cta: { label: "Explore", href: "#legacy" },
} as const;

export const legacy = {
  stat: "78+",
  statLabel: "Years of Legacy",
  title: ["THE LEGACY", "BEYOND COMPARE"],
  copy: "For over seven decades, we stood for perseverance, integrity, and nation-building through enterprise. Every step was guided by one oath: quality before profit, trust before everything.",
  cta: { label: "Our History", href: "https://murec.com/legacy.php" },
  image: "/images/madhusudan.webp",
  video: "/images/Vid2.mp4",
} as const;

export const principles = {
  index: "01",
  title: ["LIVING", "BY", "PRINCIPLES"],
  copy: "MUREC is guided by values that shape every decision—building trust, delivering quality, practicing transparency, and embracing innovation as the foundation of everything we create.",
  cta: { label: "Explore More", href: "https://murec.com/principles.php" },
  video: "/images/v2.mp4",
  image: "/images/murec.webp",
} as const;

export const collection = {
  title: ["MUREC", "COLLECTION"],
  copy: "A portfolio shaped by legacy and guided by vision, the MUREC Collection is where every project reflects our way of building.",
  cta: { label: "Discover More", href: "https://murec.com/Forest-Walk.php" },
  video: "/images/m1.mp4",
  poster: "/images/o5.webp",
} as const;

export const philosophy = {
  index: "02",
  badge: "IGBC CERTIFIED",
  title: ["DESIGN", "PHILOSOPHY"],
  copy: "The first MUREC collection is envisioned to align with the IGBC certification standards, reflecting a commitment to responsible development. From efficient resource planning to healthier living environments, the project integrates sustainability as a core design principle, thoughtfully, quietly, and with long-term impact in mind.",
  cta: { label: "Discover More", href: "https://murec.com/Design-Philosophy.php" },
  video: "/images/home.mp4",
  image: "/images/o5.webp",
} as const;

export const associations = {
  title: ["OUR", "ASSOCIATIONS"],
  logos: [
    { src: "/images/o2.webp", alt: "Association partner 1" },
    { src: "/images/o4.png", alt: "Association partner 2" },
    { src: "/images/o5.webp", alt: "Association partner 3" },
    { src: "/images/o6.webp", alt: "Association partner 4" },
    { src: "/images/bjaja.webp", alt: "Association partner 5" },
    { src: "/images/tq.webp", alt: "Association partner 6" },
  ],
} as const;

export const partners = {
  title: ["FROM OUR", "PARTNERS"],
  items: [
    {
      name: "Bobby Mukherrji",
      quote:
        "We are engaged to conceptualize the interiors for Murec's clubhouse and tower lobbies, with a focus on refined luxury and strong spatial identity.",
      image: "/images/team_2.webp",
      logo: "/images/bobyloog.png",
    },
    {
      name: "Goonmeet Ji",
      quote:
        "We are engaged to sculpt the architectural vision for Murec as a contemporary residential landmark—an address conceived for refined urban living, where design elegance is thoughtfully interwoven with functional planning to shape a premium high-rise environment of enduring character and aspiration.",
      image: "/images/team_3.webp",
    },
  ],
} as const;

export const contact = {
  title: ["GET", "IN", "TOUCH"],
  copy: "Looking to collaborate, invest, or simply know more?",
  subcopy: "Reach out and let's connect.",
  cta: { label: "Contact Us", href: "https://murec.com/contact.php" },
} as const;

export const footer = {
  team: "THE MUREC Team",
  address: "Madhusudan, 2nd Floor, Riana Towers, 51-52, Noida Sector 136, Uttar Pradesh - 201301",
  email: "info@murec.com",
  phone: "+91 97177 73229",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61586724462166" },
    { label: "YouTube", href: "https://www.youtube.com/@Murec_official" },
    { label: "Instagram", href: "https://www.instagram.com/murec_official/" },
  ],
  links: [
    { label: "About", href: "https://murec.com/about.php" },
    { label: "Legacy", href: "https://murec.com/legacy.php" },
    { label: "Collection", href: "https://murec.com/Forest-Walk.php" },
    { label: "Contact", href: "https://murec.com/contact.php" },
    { label: "Privacy Policy", href: "https://murec.com/privacy.php" },
  ],
  poweredBy: { label: "Powered by Propacity", href: "https://propacity.com" },
  copyright: `Copyright © ${new Date().getFullYear()} MUREC. All rights reserved.`,
} as const;
