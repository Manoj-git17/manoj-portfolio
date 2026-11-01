# Manoj — Editorial AI & Data Science Engineering Dossier

A bold, editorial magazine-style portfolio and technical dossier for **Manoj**, an Artificial Intelligence and Data Science engineering student (B.Tech '29).

Designed for recruiters to grasp Manoj's core technical competencies, inspect verified code and architecture, and contact him within 30 seconds.

**Live Deployment:** [manoj-portfolio-lemon.vercel.app](https://manoj-portfolio-lemon.vercel.app)

---

## ✦ Key Architecture & Sections

1. **10-Second Recruiter Hero (`#subject`)**:
   - Heavy condensed display type (`Anton` / `Bebas Neue`) paired with elegant serif accents (`Instrument Serif`) and monospace metadata.
   - Pulsing "Open to work" status chip with location (`Bengaluru, Karnataka`).
   - Clear 10-second candidate line: Target role (`AI & Data Engineering / Software Engineering Intern`) + Availability (`Summer 2025`).
   - Two streamlined action buttons: "View case files" & "Download resume".
   - Authentic portrait cutout with hover depth and interactive torchlight spotlight.

2. **Case Files That Prove It (`#case-files`)**:
   - Standardized 5-point engineering layout:
     1. **The Problem**
     2. **Engineering Approach**
     3. **SVG Architecture Flow Diagram** (e.g. `[Raw Tabular Ingestion] → [FastAPI / Pandas ETL] → [Star Schema DB] → [React 19 Dashboard]`)
     4. **Measured Concrete Result** (e.g. 38/38 passing tests, 0% data leakage, <0.8ms inference latency)
     5. **Deployed Tech Stack**
   - Active "Live Demo" and "GitHub" buttons on all projects.
   - Flagship Project: **DataPulse** (AI-Powered Data Analytics Platform).

3. **Live Proof Section (`#live-proof`)**:
   - Live public GitHub activity fetched dynamically via GitHub Public API (`https://api.github.com/users/Manoj-git17/events/public`).
   - 15-minute `localStorage` cache for API rate-limit resilience with static verified fallback commits.
   - 30-day commit density matrix.
   - Conditional LeetCode / HackerRank badge configuration.

4. **"Ask My Portfolio" AI Chat (`#ask-portfolio`)**:
   - Floating circular bottom-right widget (`ASK PORTFOLIO // AI`).
   - Clickable recruiter prompt chips:
     - *"What is Manoj's strongest project?"*
     - *"Tell me about his data engineering experience"*
     - *"Can he start immediately / internship timeline?"*
   - Dual-engine architecture:
     - Connects to `/api/chat` (FastAPI backend).
     - If the backend or API key is not configured, seamlessly falls back to a high-precision client-side retriever strictly grounded in `portfolioData.ts`. Never hallucinates or makes up qualifications.

5. **Recruiter Shortcuts & Executive Brief (`?` Shortcut)**:
   - Sticky `FOR RECRUITERS [?]` navigation pill and global keyboard shortcut (`?` key).
   - 1-screen summary: target role, top 3 engineering capabilities, best project with 1-line reason, education, and direct contact.
   - 1-click **Copy Email** button with an instant animated toast notification (`COPIED: manojps60281@gmail.com`).
   - Instant **Download CV (PDF)** action.

6. **The Chronological Record & Credibility (`#record`)**:
   - Scroll-driven vertical spine connecting real academic and development milestones (2025 through 2026).
   - "What Others Say" endorsement strip with clean placeholder cards marked `[Recommendation Pending]` with professor and mentor titles ready to populate.

7. **Engineering Polish & Accessibility**:
   - OpenGraph and Twitter cards configured for social previews.
   - Standard `robots.txt` and `sitemap.xml`.
   - Custom editorial 404 handler (`Case file not found`).
   - Keyboard accessible: `ESC` closes all modals, full focus outline support.
   - Lightweight, privacy-friendly click telemetry in `localStorage` (`resume_opened`, `recruiter_summary_opened`).
   - Subtle footer note with link to repository source code.

---

## ✦ Tech Stack

- **Frontend:** React 19, TypeScript, Vite 8, Tailwind CSS v4, Lucide React
- **Backend (AI Chat API):** FastAPI, Uvicorn, Pydantic, Python 3.10+
- **Database & Data:** PostgreSQL, SQLite, SQLAlchemy, Pandas, NumPy
- **Tooling:** Oxlint, Git

---

## ✦ Local Development

### 1. Frontend Setup
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Run Oxlint linter
npm run lint

# Build for production
npm run build
```

### 2. FastAPI Backend Setup (Optional for AI Chat)
```bash
# Create and activate Python virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install requirements
pip install -r api/requirements.txt

# Run FastAPI with live reload on port 8000
uvicorn api.main:app --reload --port 8000
```

---

## ✦ Environment Variables

Create a `.env` file in the project root:

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base URL of deployed FastAPI backend | Optional. If empty, uses `/api/chat` or client fallback |
| `GEMINI_API_KEY` | Google Gemini API key for backend AI chat | Optional. If omitted, frontend uses verified offline dossier |
| `AI_API_KEY` | Alternative generic LLM API key | Optional |

---

## ✦ Deployment Guide

### Frontend on Vercel
1. Push this repository to GitHub (`https://github.com/Manoj-git17/manoj-portfolio`).
2. Import the repository in [Vercel](https://vercel.com).
3. Framework Preset: **Vite**
4. Root Directory: `./`
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**. Vercel uses `vercel.json` for client routing and caching headers.

### Backend on Render (Free Tier)
1. In [Render Dashboard](https://dashboard.render.com), create a **New Web Service**.
2. Connect your GitHub repository.
3. Settings:
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r api/requirements.txt`
   - **Start Command:** `uvicorn api.main:app --host 0.0.0.0 --port $PORT`
4. In **Environment Variables**, set:
   - `GEMINI_API_KEY`: `<your-gemini-api-key>`
5. Copy the generated Render URL (e.g. `https://manoj-portfolio-api.onrender.com`) and add `VITE_API_URL` to your Vercel project environment settings.

---

## ✦ Candidate Configuration

All portfolio facts, links, and projects are centralized in a single typed file:
- [`src/data/portfolioData.ts`](./src/data/portfolioData.ts)

Update your LeetCode/HackerRank handles under `PORTFOLIO_DATA.personal.codingProfiles` whenever you wish to showcase live competitive programming metrics.
