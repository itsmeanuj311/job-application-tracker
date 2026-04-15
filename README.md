# Job Application Tracker

A full-stack job application tracking platform built with Next.js App Router, Better Auth, and MongoDB.

The application provides account-based access, initializes a user-specific board on signup, and is structured for a Kanban-style workflow to manage applications through recruiting stages.

## Project Status

Current implementation status:

- Done: Landing page, authentication flows, API auth wiring, route gating logic, and MongoDB schemas for boards, columns, and job applications.
- In progress: Interactive dashboard and job management CRUD/UI workflows.

This README reflects the code that exists now and calls out what is planned next.

## Core Features

### 1) Authentication and Access Control

- Email/password authentication via Better Auth.
- Session-aware navigation (login/register vs dashboard/account actions).
- Route protection that redirects:
	- Unauthenticated users away from dashboard pages.
	- Authenticated users away from sign-in/sign-up pages.

### 2) Automatic User Workspace Bootstrap

On user creation, the app provisions a default board named Job Hunt with these ordered columns:

1. Wish List
2. Applied
3. Interviewing
4. Offered
5. Rejected

This ensures every new account starts with a consistent workflow.

### 3) Domain Data Model

The backend model is designed for a Kanban board + card workflow:

- Board: Owns board metadata and column references.
- Column: Represents application stage and ordered job references.
- JobApplication: Stores company, position, status, order, notes, salary, URL, tags, and timeline metadata.

## Tech Stack

- Framework: Next.js 16 (App Router)
- Runtime/UI: React 19, TypeScript
- Auth: Better Auth
- Database: MongoDB + Mongoose
- Styling: Tailwind CSS v4
- UI primitives: Radix + shadcn/ui
- Charts/visuals: Recharts
- Icons: Lucide
- Linting: ESLint (Next.js config)

## Architecture Overview

### Frontend

- App Router pages under app.
- Shared UI components under components and components/ui.
- Session-driven navbar and auth pages.

### Backend-in-Next

- Better Auth API endpoint exposed through app/api/auth/[...all]/route.ts.
- Database connection utility with connection caching for development stability.
- Mongoose models in lib/models.
- User bootstrap logic in lib/init-user-board.ts.

## Directory Guide

- app: Route segments and API handlers.
- app/api/auth/[...all]/route.ts: Better Auth Next.js handlers.
- app/sign-in + app/sign-up: Client auth forms.
- app/dashboard: Dashboard entry route (currently minimal placeholder UI).
- lib/auth: Auth server/client integration.
- lib/models: Mongoose schemas for Board, Column, JobApplication.
- lib/db.ts: MongoDB connection with cached mongoose instance.
- lib/init-user-board.ts: Post-signup board/column initialization.
- components: Shared app components.

## Environment Variables

Create a .env.local file in the project root with:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

Notes:

- MONGODB_URI is required by lib/db.ts.
- NEXT_PUBLIC_BETTER_AUTH_URL is required by the client auth SDK.
- For production, set NEXT_PUBLIC_BETTER_AUTH_URL to your deployed base URL.

## Local Development

### Prerequisites

- Node.js 20+
- npm 10+ (or equivalent package manager)
- A MongoDB database (local or Atlas)

### Setup

1. Install dependencies:

```bash
npm install
```

2. Add environment variables in .env.local.

3. Run development server:

```bash
npm run dev
```

4. Open http://localhost:3000.

## Scripts

- npm run dev: Start development server.
- npm run build: Create production build.
- npm run start: Start production server.
- npm run lint: Run ESLint checks.

## Auth and Data Flow

1. User signs up via sign-up page.
2. Better Auth user creation completes.
3. Auth database hook runs initializeUserBoard(userId).
4. Default board and columns are inserted if not already present.
5. User is redirected to dashboard.

This flow ensures idempotent first-time provisioning and avoids duplicate boards per user.

## Current Gaps and Next Milestones

Planned implementation priorities:

1. Dashboard data hydration with user board + columns + applications.
2. CRUD APIs and UI for job applications.
3. Drag-and-drop column/card movement with persisted ordering.
4. Board analytics widgets (conversion, funnel, response rates).
5. Tests for auth guards, initialization hook, and model-level validation.

## Deployment Notes

- Deploy on Vercel or any Node-capable host.
- Configure environment variables in the deployment platform.
- Ensure MongoDB network access allows your deployment origin.
- Set NEXT_PUBLIC_BETTER_AUTH_URL to the production domain.

## Troubleshooting

- Error: Please define the MONGODB_URI environment variable inside .env
	- Cause: Missing MONGODB_URI.
	- Fix: Add MONGODB_URI in .env.local and restart dev server.

- Auth client fails to initialize or call auth endpoints
	- Cause: Missing or incorrect NEXT_PUBLIC_BETTER_AUTH_URL.
	- Fix: Point it to your running app base URL.

- Redirect loops around sign-in/sign-up/dashboard
	- Cause: Session state mismatch or proxy logic issue.
	- Fix: Clear site cookies, verify auth URL env var, then restart.

## Contributing

When contributing:

1. Keep model and API changes backward compatible where possible.
2. Add lint-clean code and meaningful naming.
3. Include tests for data and auth behavior as features land.
