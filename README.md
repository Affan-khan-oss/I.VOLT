# I.VOLT — Power Solutions Website

A multipage product website for **I.VOLT**, a power solutions brand offering UPS systems, inverters, batteries, solar products, refurbished units, and accessories. Built with React, TypeScript, and Vite, and designed initially in Figma Make.

## Overview

I.VOLT showcases the brand's full product catalog across dedicated category pages, with a consistent navy-and-gold design system, animated hero section, and individual product detail pages.

## Features

- 🏠 **Home** — hero section with brand intro, category highlights, and key stats
- ⚡ **Products** — categorized listings for UPS (Online / Offline / Both), Inverters, Batteries, and Accessories
- ♻️ **Refurbished** — refurbished product listings with condition/pricing badges
- ☀️ **Solar** — solar panels, solar inverters, and combo kits
- ℹ️ **About** — company story and background
- ✉️ **Contact** — contact form and business details
- 📄 **Product detail pages** — full specs, features, description, and related products for every item
- 🎨 Consistent design system (navy blue + gold accent theme) across all pages
- 📱 Responsive layout for desktop and mobile

## Tech Stack

- **React** + **TypeScript**
- **Vite** — build tool and dev server
- **pnpm** — package manager
- Designed in **Figma Make**

## Project Structure

```
I.VOLT/
├── .figma/make/       # Figma Make design/config files
├── src/
│   ├── components/     # Reusable UI components (Navbar, Footer, ProductCard, etc.)
│   ├── context/         # App-wide context (navigation/routing state)
│   ├── data/             # Product data (products.ts)
│   ├── pages/            # Page components (Home, Products, UPS, Inverter, Batteries,
│   │                       Accessories, Solar, Refurbished, About, Contact, ProductDetail)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [pnpm](https://pnpm.io/installation)

### Installation

```bash
git clone https://github.com/Affan-khan-oss/I.VOLT.git
cd I.VOLT
pnpm install
```

### Development

```bash
pnpm dev
```

This starts the Vite dev server. Open the local URL shown in the terminal (typically `http://localhost:5173` or `http://localhost:8443`) to view the site.

### Build

```bash
pnpm build
```

### Preview production build

```bash
pnpm preview
```

## Roadmap

- [ ] Populate all product categories with full catalog data
- [ ] Finalize product detail page content for every item
- [ ] Add branded loading screen animation
- [ ] Optimize images and performance
- [ ] Deploy to production (Vercel/Netlify)

## License

This project is currently unlicensed. Add a license file if you intend to open-source or share this project publicly.

## Contact

For questions about this project, reach out via the repository's [Issues](https://github.com/Affan-khan-oss/I.VOLT/issues) tab.
