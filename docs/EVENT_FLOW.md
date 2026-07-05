# Event Flow

RecruitPilot utilizes an Event-Driven Architecture (EDA) to handle side effects, notifications, and analytics asynchronously. This ensures that core CRUD operations remain lightning fast and decoupled from secondary logic.

## The Event Bus
We use `@nestjs/event-emitter`. Events are emitted natively within the Node process.

## Common Event Flows

### 1. Document Upload
- **Trigger:** `DocumentService` completes an S3 upload and saves the metadata to MongoDB.
- **Emit:** `document.uploaded` (payload: documentId, ownerType, ownerId).
- **Subscribers:** 
  - `TimelineService`: Logs "Resume Uploaded" to the candidate's activity stream.
  - (Future) `ParsingService`: Triggers an asynchronous AWS Textract / AI parsing job.

### 2. Profile Updates
- **Trigger:** Candidate adds a new work experience via `CandidateProfileController`.
- **Emit:** `PROFILE_EXPERIENCE_ADDED`.
- **Subscribers:**
  - `TimelineService`: Logs the action.
  - (Future) `AIRecommendationService`: Re-evaluates job matching scores based on the new data.

## Best Practices
1. **Naming Convention:** Use `domain.action` or `DOMAIN_ACTION` format (e.g., `document.uploaded`).
2. **Payload:** Pass IDs, not full objects. Let the consumer fetch the full object if needed. This prevents passing stale state.
3. **Error Handling:** Event listeners must wrap their logic in `try/catch` to ensure a failing side-effect does not crash the Node process.
