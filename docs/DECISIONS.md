# Architectural Decisions & Interview Q&A

This document serves as an Architectural Decision Record (ADR) and a guide to the engineering philosophy behind RecruitPilot.

### 1. Why immutable snapshots?
If an application simply held a reference (ObjectId) to a Candidate's profile, any future update the candidate makes to their resume or skills would retroactively alter the application the recruiter sees. By embedding an immutable snapshot of the Candidate and Job at the exact moment of application, we ensure the recruiter reviews the candidate exactly as they were when they applied.

### 2. Why EventEmitter instead of direct service calls?
In a modular monolith, if `ApplicationService` directly calls `TimelineService`, `NotificationService`, and `AnalyticsService`, it becomes a god class tightly coupled to the entire system. By using `@nestjs/event-emitter`, `ApplicationService` only concerns itself with state transitions. This follows the Single Responsibility Principle and allows us to easily add or remove side effects without touching core business logic.

### 3. Why separate aggregators?
Core services (e.g., `JobService`) should only handle operations on their specific entity. If `JobService` starts fetching candidates, applications, and timelines to build a frontend view, it violates domain boundaries. `WorkspaceAggregatorService` acts as an orchestrator (or Backend-For-Frontend pattern), aggregating data across modules purely for read-heavy frontend views, keeping the core services clean.

### 4. Why Master Data collections?
Skills, Technologies, and Locations are referenced across thousands of jobs and profiles. If they were free-text fields, analytics and search would be impossible due to typos (e.g., "Node.js", "node js", "NodeJS"). Centralized Master Data collections enforce a unified taxonomy, powering accurate AI matching and analytics.

### 5. Why polymorphic Documents?
Documents in recruitment vary wildly (Resumes, Portfolios, Offer Letters, ID Proofs). Instead of creating a separate schema for each, a polymorphic `Document` schema with a `documentType` enum allows us to utilize a single service and storage bucket for all file handling while retaining strict typing.

### 6. Why Timeline is generic?
Recruitment requires heavy auditing. If every entity (Job, Application, Candidate) maintained its own localized history array, querying a global "Recruiter Activity Feed" would require expensive cross-collection joins. A generic `Timeline` collection with `entityId` and `entityType` enables global activity tracking with a single query.

### 7. Why Job Templates are separate?
Active jobs have lifecycles (Draft -> Published -> Closed), hiring teams, and applicants. Templates are purely blueprints. Mixing them in the same collection would require heavy `$match` filtering to avoid showing templates as active jobs. Keeping them in a separate `JobTemplate` collection maintains clean boundaries.

### 8. Why DashboardService instead of many API calls?
If the frontend requests `totalJobs`, `totalApplications`, and `hires` individually, it suffers from network latency and browser connection limits. `DashboardMetricsService` utilizes `Promise.all` and MongoDB Aggregation Pipelines to fetch all metrics in parallel on the server (which is directly next to the database), returning a single, highly-optimized payload.
