# AGENTS.md - WebDesignJE Technical Source of Truth

This document is the operational handoff for AI agents working in this repository. It reflects the current codebase state as of May 21, 2026 and includes architecture, risk analysis, security gaps, Firebase cost controls, scalability constraints, and a practical modernization roadmap.

## Change Control Log
- 2026-05-21: Removed legacy subtree `public/portal` from the repository by user request.
- 2026-05-21: Removed `components/medical` and related medical dashboard surfaces by user request.
- 2026-05-21: Removed pagination/cursor strategy from project directives by user request.
- 2026-05-21: Consolidated AGENTS.md as the single control file for technical tracking.
- 2026-05-21: Security baseline patch applied:
  - Replaced admin email hardcode checks with role-based validation (`lib/authz.ts`) in `app/loginadmin/page.tsx` and `app/admin/page.tsx`.
  - Added callable Cloud Function `logAuditFromClient` in `functions/src/index.ts`.
  - Added canonical root Firebase policy files: `firestore.rules`, `storage.rules`, `firestore.indexes.json`.
  - Updated `firebase.json` to declare Firestore and Storage rule/index governance from root.
- 2026-05-21: Deleted all medical module dead code (lib/api/*, hooks/usePatients.ts, context/AuthContext.tsx, lib/cache.ts, lib/audit.ts, types/*). Also deleted legacy redirect lib/api.ts. Achieved 0 ESLint errors + 0 TS errors across the project.
- 2026-05-21: Removed client-facing floating chat widget (ChatWidget.tsx, ChatBot.tsx) from layout and codebase. AI endpoint `/api/chat` preserved for future admin-side AI assistant integration.
- 2026-05-21: Rewrote ContactSection.tsx as a professional 4-step diagnostic form (Contact → Project Profile → Goals → Review + AI Analysis) with dynamic business profile questions, pain point selection per project type, and AI-generated personalized diagnosis. Saves expanded fields to `leads` collection for CRM follow-up.

## 1) Project Identity
- Name: `medical-ai-demo` (package), branded as WebDesignJE.
- Goal: Portfolio + lead generation platform with AI assistant and admin CRM. No medical/clinical functionality.
- Primary runtime: Next.js 16 App Router (`app/`) + Firebase + Vercel AI SDK.

## 2) Real Repository Topology

### Active app (root)
- `app/`: Next.js routes and API handlers.
- `components/landing/`: marketing and lead capture UI.
- `lib/`: Firebase init, API modules, caching, offline queue, i18n.
- `context/`: auth/theme/query providers.
- `hooks/`: React Query wrappers (`usePatients`, etc.).
- `functions/src/index.ts`: Firebase HTTPS functions for chatbot endpoints (`clawChat`, `clawStatus`).
- `firebase.json` (root): Hosting + functions rewrites.

### Architecture status
- Repository is now focused on a single active Next.js application.
- Medical module and legacy portal are intentionally de-scoped.
- Any remaining references to deleted modules should be treated as stale and removed progressively.

## 3) High-Risk Findings (Priority)

### P0 - Security / Governance
1. Hardcoded admin identity in UI checks
- Files:
  - `app/loginadmin/page.tsx`
  - `app/admin/page.tsx`
- Pattern: direct email comparison `admin@webdesignje.com` for access gating.
- Risk: role bypass assumptions, weak RBAC model, brittle security logic in client.
- Required fix: move authorization to server-side claims/roles and Firestore rules enforcement; UI should only reflect authenticated role.

2. Firebase rules are not governed from root deployment config
- Root `firebase.json` does not declare `firestore.rules` or `storage.rules`.
- Risk: unknown effective production rules, drift between intended and deployed policy.
- Required fix: define canonical root-level `firestore.rules`, `storage.rules`, `firestore.indexes.json` and reference them in root `firebase.json`.

### P1 - Functional/Security Integrity
3. Audit logging contract mismatch
- Client expects callable function `logAuditFromClient` (`lib/audit.ts`).
- Root Cloud Functions file (`functions/src/index.ts`) exports only `clawChat` and `clawStatus`.
- Impact: silent audit loss, broken compliance trail.

4. Offline queue role check bug
- File: `lib/offlineQueue.ts`.
- `canUseOfflineMode(userRole)` expects role, but callers pass email (`auth.currentUser?.email`).
- Impact: logic failure and inconsistent offline behavior.

5. Broad Firestore reads and client-side filtering (RESOLVED - dead code deleted)

## 4) Quality and Stability Findings

1. Lint baseline is clean
- `npm run lint` currently reports 0 errors, 0 warnings.
- Maintain through CI gating and progressive rule enforcement.

2. Encoding inconsistencies (mojibake)
- Several files display broken UTF-8 text sequences.
- Risk: maintainability issues, accidental runtime/parser failures.

## 5) Database and Data Model Analysis

### Current collections observed
- `patients`
- `appointments`
- `initialHistories`
- `subsequentConsults`
- `leads`
- `project_inquiries`
- audit-related collections expected but inconsistent with current deployed functions

### Data access patterns
- Histories/consults use dual-write and dual-read (subcollection + root collection).
- Pros: migration compatibility.
- Cons: doubled writes/reads, sync drift risk, higher billing.

### Immediate DB improvements (without pagination/cursor)
- Standardize canonical source (subcollections OR root flat collections, not both long-term).
- Reduce unnecessary client-wide reads by narrowing query scopes.
- Add index governance from a single root `firestore.indexes.json`.

## 6) Firebase Cost Optimization Analysis

### Existing positives
- React Query stale times reduce redundant fetches.
- Image compression before upload exists.

### Cost leak points
- Full collection scans in client.
- Real-time listeners where one-shot fetch is enough.
- Dual-write model for histories/consults.

### Cost roadmap
- Phase 1: reduce broad scans and over-fetching in patients/histories/appointments.
- Phase 2: collapse dual-write after migration cutover.
- Phase 3: isolate admin analytics to scheduled aggregation documents.
- Phase 4: add Firestore TTL/archival strategy for stale logs and lead lifecycle.

## 7) Scalability Analysis

### Current blockers
- Client-driven data orchestration with wide reads.
- No explicit multitenant isolation in root app policies.
- Security model partially UI-driven instead of server/claims/rules-driven.

### Scale-ready direction
- Move sensitive writes and role checks to callable/server handlers.
- Enforce tenant/clinic boundaries in Firestore rules + query layer.
- Introduce domain services in `lib/api/*` with strict DTO schemas and zod validation.
- Add observability SLOs via Sentry and function-level metrics.

## 8) Modernization Plan (Practical)

### Phase A - Security First (mandatory)
- Remove email-based admin checks from UI authorization.
- Implement claims-based RBAC and verify in Firestore rules.
- Promote canonical root rules/indexes and deploy from root pipeline only.
- Reintroduce/implement `logAuditFromClient` callable or refactor client to valid endpoint.

### Phase B - Data and Cost
- Refactor data queries to narrower server-friendly patterns (without cursor pagination).
- Disable unnecessary `onSnapshot` subscriptions on large sets.
- Decommission dual-write once migration confidence is reached.

### Phase C - DX and Quality
- Establish lint budget and progressive cleanup by domain.
- Add type-safe API contracts (remove `any` from critical routes first).
- Add CI gates: lint on changed files + smoke test for auth/API/rules sanity.

## 9) Feature Backlog (High Value)
- Role management panel backed by custom claims + audit trail.
- Lead scoring and conversion funnel analytics with aggregate docs.
- Rate limiting and abuse protection on `/api/chat` and `/api/project-inquiry`.
- Structured AI prompt/config management (versioned prompts and fallback model strategy).
- Security hardening: App Check, stricter CSP, and signed upload flow for Storage.
- Admin AI assistant integration: connect `/api/chat` into the admin dashboard for lead analysis and sales assistance.

## 10) File-by-File Orientation for External AI Agent

### Core app entry
- `app/layout.tsx`: global providers, metadata, and global chat widget mount.
- `app/page.tsx`: landing composition.

### API layer
- `app/api/chat/route.ts`: AI chat streaming endpoint via Vercel AI SDK/OpenAI gateway.
- `app/api/project-inquiry/route.ts`: AI-assisted project inquiry response endpoint.

### Admin/auth
- `app/loginadmin/page.tsx`: admin login UI (currently hardcoded email gate; needs RBAC migration).
- `app/admin/page.tsx`: admin dashboard using Firestore listeners for leads/inquiries.

### Data and business logic
- `lib/firebase.ts`: Firebase app/services initialization.
- `lib/api/patients.ts`: patient CRUD + subscriptions.
- `lib/api/histories.ts`: dual-write/dual-read histories and consults.
- `lib/api/appointments.ts`: appointments CRUD and date filtering.
- `lib/cache.ts`: cache + compression + persistence helpers.
- `lib/offlineQueue.ts`: offline queue (contains role/email mismatch bug).
- `lib/audit.ts`: client audit callable wrapper (currently contract mismatch).

### Cloud Functions (root)
- `functions/src/index.ts`: currently only chatbot/status endpoints.

## 11) Non-Negotiable Rules for Future Agents
1. Do not implement security decisions in client-only checks.
2. Every role decision must be enforced in backend/rules.
3. Do not add new broad Firestore scans without explicit cost justification.
4. Do not reintroduce deleted legacy subtree artifacts.
5. Do not reintroduce `components/medical` unless explicitly requested by the owner.
6. Any AI endpoint must include input validation, abuse controls, and failure-safe fallback.

## 12) Suggested Execution Order for Next Agent
1. Security baseline patch (RBAC + canonical rules + audit endpoint contract).
2. Data-query and Firebase cost refactor.
3. Lint/type debt reduction on critical user paths.
4. Feature rollout with observability and tests.

---
Last update: May 21, 2026
Maintainer note: this file is the canonical operational guide for AI agents and the official control log for architecture decisions.
