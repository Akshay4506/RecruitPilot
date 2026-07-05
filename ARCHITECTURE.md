# RecruitPilot Architecture Document

This document serves as the single source of truth for the RecruitPilot system architecture, database design, and strategic technical decisions. It ensures the project remains scalable, maintainable, and aligned with enterprise SaaS standards.

---

## 1. Strategic Decisions (The "Why")

*   **Why NestJS?** As the project grows from a startup MVP to an enterprise SaaS, NestJS provides essential guardrails. Its modularity, built-in Dependency Injection, Guards for RBAC, and DTO validation prevent the codebase from becoming a tangled mess, unlike plain Express.
*   **Why Next.js?** It offers the enterprise standard for React applications, providing Server-Side Rendering (SSR) for public-facing career pages (SEO), excellent routing, and seamless integration with our UI stack (Tailwind, Shadcn).
*   **Why MongoDB?** Recruitment data is highly nested and document-oriented. A candidate's application naturally contains a timeline, interview feedback, and scorecard results. MongoDB allows us to retrieve an entire application state in a single query without complex JOINs.
*   **Why BullMQ + Redis?** Essential for decoupling long-running tasks from the main thread. Resume parsing, sending email batches, and AI matching will run asynchronously to keep the API blazing fast.
*   **Why Daily.co?** Building robust WebRTC (video interviews) in-house is a massive distraction and maintenance nightmare. Utilizing a specialized service allows us to focus on hiring workflows.
*   **Why Resend & Cloudflare R2?** Resend provides the best Developer Experience (DX) for transactional emails. R2/S3 ensures we don't clog our application servers with massive resume PDFs, keeping our deployment stateless.

---

## 2. MongoDB Data Model & Collections

### 2.1 `companies` (Tenants)
*   **Purpose:** The core tenant in the multi-tenant architecture. All other data is scoped here.
*   **Fields:** `name`, `domain`, `branding` (logo, colors), `settings` (timezone, preferences), `subscription_tier`, `created_at`.
*   **Required Indexes:** `domain` (Unique), `_id`
*   **Scalability:** Rarely updated, heavily read. Perfect for Redis caching.

### 2.2 `users` (Staff/Admins)
*   **Purpose:** Company employees interacting with the platform.
*   **Fields:** `email`, `password_hash`, `name`, `avatar`, `refresh_token`.
*   **Referenced:** `companyId` (refs `companies`), `roleId` (or enum for RBAC).
*   **Required Indexes:** `email` (Unique), `companyId`

### 2.3 `candidates`
*   **Purpose:** Global or company-scoped candidate profiles.
*   **Fields:** `firstName`, `lastName`, `email`, `phone`, `socialLinks`, `resumeUrl`, `parsedData` (JSON).
*   **Embedded:** `education` (array), `experience` (array).
*   **Referenced:** `companyId` (to isolate talent pools).
*   **Required Indexes:** `email` + `companyId` (Unique), Text index on `parsedData` for search.

### 2.4 `jobs` (Requisitions)
*   **Purpose:** Active/Closed job postings.
*   **Fields:** `title`, `description`, `department`, `location`, `type` (Remote/Hybrid), `status` (Draft, Published, Closed).
*   **Embedded:** `requirements` (array).
*   **Referenced:** `companyId`, `pipelineId` (refs `hiringPipelines`), `hiringManagerId` (refs `users`).
*   **Required Indexes:** `companyId`, `status`. Text index on `title` + `department`.

### 2.5 `applications`
*   **Purpose:** The central entity tracking a candidate's journey for a specific job.
*   **Fields:** `status` (Active, Rejected, Hired), `source` (LinkedIn, Career Page), `appliedAt`.
*   **Embedded:** `timeline` (Array of events: Stage changed, Email sent, etc.).
*   **Referenced:** `jobId`, `candidateId`, `companyId`, `currentStageId` (refs `pipelineStages`).
*   **Required Indexes:** `jobId` + `candidateId` (Unique), `companyId`, `currentStageId`.
*   **Scalability:** As timelines grow, we may cap embedded events and offload older logs to `auditLogs`.

### 2.6 `hiringPipelines` & `pipelineStages`
*   **Purpose:** Defines the dynamic workflows for jobs.
*   **Fields (`hiringPipelines`):** `name`, `isDefault`, `companyId`.
*   **Fields (`pipelineStages`):** `name`, `type` (Screening, Interview, Offer), `orderIndex`, `pipelineId`.
*   **Required Indexes:** `pipelineId` + `orderIndex`.

### 2.7 `assessments` & `questions`
*   **Purpose:** Reusable tests and coding challenges.
*   **Fields:** `title`, `durationMinutes`, `type` (MCQ, Coding).
*   **Referenced:** `companyId`. Questions can be embedded if small, or referenced (`questionId`) if part of a massive shared bank.

### 2.8 `interviews` & `feedback`
*   **Purpose:** Scheduled interview rounds and the resulting scorecards.
*   **Fields (`interviews`):** `scheduledAt`, `duration`, `meetingUrl`, `status`.
*   **Embedded (`feedback`):** `score`, `strengths`, `weaknesses`, `recommendation` (Hire, No Hire).
*   **Referenced:** `applicationId`, `interviewerIds` (Array refs `users`), `stageId`.
*   **Required Indexes:** `applicationId`, `interviewerIds`.

### 2.9 `offers`
*   **Purpose:** Final offer details.
*   **Fields:** `baseSalary`, `equity`, `signingBonus`, `status` (Pending, Accepted, Declined), `expiresAt`.
*   **Referenced:** `applicationId`, `companyId`.

### 2.10 `notifications` & `auditLogs`
*   **Purpose:** System alerts and immutable history.
*   **Fields:** `type`, `message`, `read`, `metadata` (JSON).
*   **Required Indexes:** TTL Index (e.g., delete notifications after 90 days), `userId`.

---

## 3. Embedding vs. Referencing Strategy

*   **Embed:** Data that is heavily dependent, rarely queried independently, and read together. 
    *   *Examples:* Application Timeline inside `applications`, Feedback Scorecards inside `interviews`, Candidate Education inside `candidates`.
*   **Reference:** Independent entities that multiple other entities point to, or data that grows infinitely.
    *   *Examples:* `users`, `companies`, `jobs`, `candidates`. An application *references* a job and a candidate; it does not embed them.

## 4. Module Dependencies (DAG)

To prevent circular dependencies in NestJS, modules depend strictly downwards:

```
Platform (Main)
 └── AuthModule
      └── CompanyModule
           └── UserModule (RBAC)
                └── JobModule
                     └── PipelineModule
                          └── CandidateModule
                               └── ApplicationModule
                                    ├── AssessmentModule
                                    ├── InterviewModule
                                    └── OfferModule
```
*   *Rule:* Higher-level modules (Offer) can import lower-level modules (Application), but not vice-versa. Sibling modules communicate via Events (EventEmitter / BullMQ).

## 5. MongoDB Index Strategy

1.  **Single Field Indexes:** `companyId` on almost every collection to speed up tenant-scoped queries.
2.  **Compound Indexes:** 
    *   `jobs`: `{ companyId: 1, status: 1 }`
    *   `applications`: `{ jobId: 1, currentStageId: 1 }` (For filtering candidates in a specific pipeline stage).
3.  **Text Indexes:** `{ "$**": "text" }` on `candidates.parsedData` and `jobs.title` for Phase 1 search before Atlas Search is introduced.
4.  **TTL (Time-To-Live) Indexes:** On `notifications` (expire after 90 days) and `auditLogs` (move to cold storage after 1 year).

## 6. API Naming Conventions (REST)

*   **Endpoints:** Plural nouns, lowercase, kebab-case. 
    *   `GET /api/v1/jobs`
    *   `POST /api/v1/jobs/:id/applications`
*   **Response Format:** Standardized envelope.
    ```json
    {
      "success": true,
      "data": { ... },
      "meta": { "page": 1, "total": 50 } // For pagination
    }
    ```
*   **Error Format:**
    ```json
    {
      "success": false,
      "error": {
        "code": "VALIDATION_FAILED",
        "message": "Invalid email format",
        "details": [...]
      }
    }
    ```

## 7. Folder Structure (Monorepo)

```text
/RecruitPilot
├── apps/
│   ├── backend/               # NestJS Application
│   │   ├── src/
│   │   │   ├── common/        # Guards, Interceptors, Filters
│   │   │   ├── config/        # Environment vars
│   │   │   └── modules/       # Domain-driven modules (Auth, Jobs, etc.)
│   │   └── package.json
│   │
│   └── frontend/              # Next.js Application
│       ├── src/
│       │   ├── app/           # App Router pages
│       │   ├── components/    # Shadcn & UI components
│       │   ├── hooks/         # React Query hooks
│       │   └── lib/           # Utils, api client
│       └── package.json
│
├── shared/
│   ├── types/                 # Shared TypeScript interfaces (DTOs)
│   └── constants/             # Enums, standard values
│
└── package.json               # Monorepo root
```

## 8. Event Flow Example (Application Lifecycle)

1.  **Candidate Applies:** Frontend sends `POST /api/v1/applications`.
2.  **Save Document:** `ApplicationService` saves the document referencing `Job` and `Candidate`.
3.  **Event Emitted:** `ApplicationCreatedEvent` is fired internally.
4.  **Resume Uploaded:** File uploaded to R2/S3. URL saved to DB.
5.  **BullMQ (Async):** Job added to `ParseResumeQueue`.
6.  **AI Parsing:** Worker picks up job, sends to OpenAI, extracts skills.
7.  **Match Score:** Updates `Candidate` profile with AI Match Score.
8.  **Recruiter Notification:** Notification inserted into DB via WebSockets/SSE to Recruiter.

---

## 9. Phased Execution Plan

*   **Phase 1:** Authentication, Company, RBAC, JWT, OAuth
*   **Phase 2:** Companies, Users, Workspace, Invitations
*   **Phase 3:** Jobs, Applications, Resume Upload
*   **Phase 4:** Pipeline Builder, Candidate Timeline
*   **Phase 5:** Assessment Engine
*   **Phase 6:** Interview Engine
*   **Phase 7:** Offers, Emails, Notifications
*   **Phase 8:** AI Layer
*   **Phase 9:** Analytics, Audit, Reports
