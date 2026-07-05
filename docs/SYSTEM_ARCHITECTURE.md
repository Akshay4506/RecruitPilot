# System Architecture

## Overview
RecruitPilot is an enterprise-grade applicant tracking system (ATS) and talent management platform. The architecture is designed to cleanly separate the B2B side (Company/Recruiters) from the B2C side (Candidates) while allowing them to interact securely through shared platform services.

## Tech Stack
- **Backend:** NestJS (Node.js)
- **Language:** TypeScript (Strict mode enabled)
- **Database:** MongoDB (using Mongoose ODM)
- **Authentication:** Passport.js (JWT)
- **Storage:** S3-compatible provider abstraction (AWS S3 / Cloudflare R2)

## Architectural Patterns

### 1. Modular Monolith
The backend is structured as a modular monolith. Business domains are strictly isolated into distinct modules (e.g., `CandidateModule`, `CompanyModule`, `DocumentModule`). Modules expose specific services and communicate with each other via Dependency Injection and event-driven hooks, preventing tight coupling.

### 2. Multi-Tenancy & Isolation
- **Company Workspaces:** B2B users belong to specific `Workspaces` (tenants). Data is strictly isolated using an `organizationId` reference.
- **Candidate Profiles:** Candidates exist globally and completely independently of any specific company. They own their data and grant access via applications.

### 3. Event-Driven Architecture
To prevent deep nesting and tight coupling (e.g., the `CandidateModule` directly writing to the `TimelineModule`), the system heavily leverages `EventEmitter2`. Domain actions fire events (like `PROFILE_UPDATED`), which are asynchronously consumed by side-effect modules (like Audit Logs and Timeline).

### 4. Storage Abstraction
File storage uses an Adapter pattern (`StorageService`). The business logic interacts with a generic `StorageInterface`, allowing the underlying provider (local disk, AWS S3, Cloudflare R2) to be swapped via configuration without touching domain code.
