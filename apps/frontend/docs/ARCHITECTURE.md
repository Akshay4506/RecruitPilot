# Architecture Overview

RecruitPilot is built as a highly modular, feature-sliced Next.js (App Router) application.

## Core Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4 CSS-first architecture)
- **State Management:** Zustand (Client state), React Query (Server state)
- **Animation:** Framer Motion

## Folder Structure
```
apps/frontend/
├── app/                  # Next.js App Router (Routes & Layouts)
├── components/           # Generic, globally shared UI components
├── features/             # Feature-sliced modules (The core of the app)
├── hooks/                # Globally shared React hooks
├── lib/                  # Utilities, formatters, and pure functions
├── providers/            # React Context providers (Theme, Query, Toast)
├── scripts/              # Build and maintenance scripts
├── store/                # Global Zustand stores (ui.store.ts)
└── docs/                 # Documentation
```

## Feature Slices
We strictly adhere to a Feature-Sliced Design (FSD). A feature module contains everything it needs to function:
```
features/[feature-name]/
├── components/       # Feature-specific React components
├── hooks/            # Feature-specific hooks (e.g., use-jobs.ts)
├── mock/             # Mock data for local development
├── services/         # API integration layer and DTOs
└── types.ts          # Feature-specific TypeScript interfaces
```

## Data Fetching Architecture (Milestone 5+)
Data fetching is layered to completely decouple the UI from the backend network layer.

1. **Component Layer:** Calls `useJobs()`
2. **React Query Hook:** Caches data, manages loading/error states, calls `Service.getAll()`
3. **Service Interface / API Service:** Makes the actual `fetch` call, parses response using DTOs.
4. **DTO Layer:** Maps backend JSON to frontend TypeScript models.
