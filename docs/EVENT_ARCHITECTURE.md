# Event-Driven Architecture

RecruitPilot utilizes `@nestjs/event-emitter` to implement an Event-Driven Architecture within the modular monolith.

## Core Philosophy
We do not use events for synchronous data fetching. We use events strictly for **asynchronous side-effects**. If an action fails (e.g., sending an email), it should not cause the core transaction (e.g., submitting an application) to roll back.

## Common Events

### `application.submitted`
- **Fired By:** `ApplicationLifecycleService`
- **Payload:** `{ applicationId, companyId, candidateId }`
- **Listeners:**
  - `TimelineModule`: Logs "Application Submitted" to the audit trail.
  - `NotificationModule` (Future): Emails candidate confirmation, notifies recruiter.

### `application.status_changed`
- **Fired By:** `ApplicationLifecycleService`
- **Payload:** `{ applicationId, companyId, oldStatus, newStatus, userId }`
- **Listeners:**
  - `TimelineModule`: Logs the transition.
  - `AnalyticsModule` (Future): Precomputes time-in-stage metrics.

### `job.published`
- **Fired By:** `JobLifecycleService`
- **Payload:** `{ jobId, companyId, publishedBy }`
- **Listeners:**
  - `TimelineModule`: Logs publication.
  - `DistributionModule` (Future): Posts job to LinkedIn/Indeed via API.

## Rules for Event Listeners
1. Listeners must be decorated with `@OnEvent('event.name', { async: true })`.
2. Listeners must encapsulate their own error handling (try/catch). A failing listener must never crash the main thread.
