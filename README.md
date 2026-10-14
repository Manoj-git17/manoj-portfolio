# Manoj — Personal Portfolio Website

A personal portfolio website for **Manoj**, an Artificial Intelligence and Data Science engineering student (Expected Graduation: 2029).

Built with **Apple-inspired premium minimalism**: calm, confident, typography-focused, generous whitespace, warm off-white tones, subtle blue accents, and authentic academic and engineering substance.

---

## ✦ Key Design & Engineering Features

- **Apple-Inspired Aesthetic**:
  - Warm white and off-white backgrounds (`#FFFFFF`, `#FBFBFD`, `#F5F5F7`).
  - Deep black typography (`#1D1D1F`) with San Francisco / Inter font stack.
  - Controlled neutral grey tones (`#6E6E73`, `#86868B`).
  - Subtle Apple blue accent (`#0071E3`).
  - Generous whitespace and hairline borders (`border-black/[0.06]`).
- **Interactive Computational Lattice**:
  - High-performance, Retina-crisp 2D canvas simulation in the Hero section.
  - Dynamically reactive to cursor movements with subtle harmonic oscillation.
- **Section Structure**:
  1. **Navigation Bar**: Minimalist sticky header with `MANOJ.` wordmark, section scroll links, mobile drawer, and discreet Resume modal trigger.
  2. **Hero Section**: Editorial headline, typography scale, introductory labels, and dual call-to-action buttons.
  3. **About Me**: Clean editorial introduction and 3 foundational engineering principles.
  4. **Expertise & Skills**: "Tools I work with" organized by Programming, Web, Data, Tools, and AI with filter pills.
  5. **Selected Projects**: Authentic student engineering projects with technology badges and interactive Architecture modals.
  6. **Education**: Degree overview, 2029 graduation timeline, and coursework categories (Computing, Mathematics, Data & Intelligence).
  7. **Contact**: Direct email with one-click clipboard copy, GitHub and LinkedIn links, and a minimalist message form.
  8. **Academic Resume Modal**: Clean printable / copyable CV viewer.

---

## ✦ Tech Stack

- **React 19**
- **Vite 8**
- **TypeScript**
- **Tailwind CSS v4** with `@tailwindcss/vite`
- **Lucide React**

---

## ✦ Getting Started

### 1. Project Locations
- Primary Desktop Folder: `C:\Users\manoj\OneDrive\Desktop\manoj-portfolio`
- Local Backup Mirror: `C:\Users\manoj\.gemini\antigravity\scratch\manoj-portfolio`

### 2. Development Server
```bash
npm run dev
```

### 3. Code Quality & Linter
```bash
npm run lint
```

### 4. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## ✦ Git & Version Control Setup

When ready to initialize Git locally:
```bash
git init
git add .
git commit -m "feat: complete apple-inspired personal portfolio"
```

---

## ✦ Deploying to Vercel

1. Push your repository to your GitHub account (`https://github.com/<your-username>/manoj-portfolio`).
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `manoj-portfolio` repository.
4. Framework Preset: **Vite**
5. Root Directory: `./`
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Click **Deploy**. Vercel will automatically configure SSL, edge CDN, and continuous deployments upon git push.

---

## ✦ Customizing Your Information

All personal details, skills, coursework, and projects are centralized in a single typed configuration file:
- [`src/data/portfolioData.ts`](./src/data/portfolioData.ts)

You can edit your email (`manojps60281@gmail.com`), social links, project descriptions, and coursework anytime by updating that file.
