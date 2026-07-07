# System Architecture

RecruitPilot is designed as a **Modular Monolith** using **NestJS**. This architecture provides the development speed and simplicity of a monolith while enforcing strict domain boundaries that make it easy to extract microservices in the future.

## High-Level Architecture

The system is divided into three primary layers:

1. **API Layer (Controllers & DTOs):** Handles HTTP requests, input validation, and JWT authentication.
2. **Service Layer (Business Logic):** Enforces business rules and orchestrates data fetching.
3. **Data Access Layer (Mongoose/MongoDB):** Handles persistence, utilizing advanced aggregation pipelines for analytics.

## Key Architectural Patterns

### 1. Modular Domain Driven Design (DDD)
The application is split into distinct domain modules (`JobModule`, `ApplicationModule`, `CandidateModule`, `RecruiterWorkspaceModule`). Modules encapsulate their own schemas, controllers, and services. 

### 2. Event-Driven Decoupling
To prevent tight coupling between domains, we utilize `@nestjs/event-emitter`. When a candidate applies for a job, the `ApplicationModule` fires an `ApplicationSubmittedEvent`. Other modules (like `TimelineModule` for auditing, or future Notification modules) listen to these events asynchronously without blocking the core request lifecycle.

### 3. Aggregation Services vs. Core Services
- **Core Services** (e.g., `ApplicationService`) handle strict CRUD and lifecycle transitions for a single entity.
- **Aggregation Services** (e.g., `WorkspaceAggregatorService`) sit above core services. They fetch data from multiple domains (Job, Application, Timeline, Candidate) to construct massive, unified payloads for the frontend, eliminating N+1 API requests on the client.

### 4. Immutable Snapshots
Instead of relying strictly on foreign keys, the system embeds point-in-time snapshots of entities (e.g., embedding a Candidate profile snapshot inside an Application). This prevents historical applications from changing if a candidate updates their profile months later.
