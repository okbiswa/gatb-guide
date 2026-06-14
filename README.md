# GAT-B Admission Navigator

A production-ready web application helping **GAT-B 2026** candidates discover suitable institutes and programmes based on their score and category.

🔗 **Live Demo**: *(deploy to Vercel to get your URL)*

## Features

- 🎯 **Smart Matching** — Weighted historical cutoff algorithm (2021–2025)
- 📊 **83+ Institutes** — Complete database of GAT-B participating institutes
- 📈 **5 Categories** — UR, EWS, OBC-NCL, SC, ST with intelligent fallback
- ⭐ **Premier Institutes** — Dedicated section for top-tier programmes
- 📱 **Responsive** — Works on all devices

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI**: shadcn/ui + Radix UI
- **Deployment**: Vercel

## Prerequisites

- [Node.js](https://nodejs.org/) **v18.17+** (LTS recommended)
- npm (comes with Node.js)
- Git

## Quick Start

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd GAT-B

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

## Project Structure

```
├── data/                    # CSV data files
│   ├── institutes.csv       # 83 institutes & programmes
│   └── master_cutoffs.csv   # 162 cutoff records (2021–2025)
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   ├── lib/                 # Core logic & utilities
│   └── actions/             # Server actions
├── package.json
├── next.config.ts
└── vercel.json
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment to Vercel

### Option A: GitHub Integration (Recommended)

1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Vercel auto-detects Next.js — click **Deploy**
5. Done! Your site is live.

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel
```

## Updating Data

1. Edit `data/institutes.csv` or `data/master_cutoffs.csv`
2. Commit and push to GitHub
3. Vercel auto-redeploys

## Algorithm

The recommendation engine uses a **weighted historical cutoff** approach:

1. Collect all min_scores for each institute + category
2. Apply year weights (2025 = 5×, 2024 = 4×, ..., 2021 = 1×)
3. Calculate weighted average cutoff
4. Classify based on user score vs weighted cutoff ± std deviation

| Classification | Condition |
|---------------|-----------|
| ✅ High Match | score ≥ cutoff + σ |
| 🎯 Good Match | cutoff - σ < score < cutoff + σ |
| 🚀 Ambitious  | score ≤ cutoff - σ |

## License

MIT
