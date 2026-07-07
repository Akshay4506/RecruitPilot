# Database Design

RecruitPilot utilizes **MongoDB**, a NoSQL database, allowing for highly flexible, document-based schemas perfectly suited for the deeply nested data structures of recruitment (e.g., nested employment histories, dynamic skills).

## Core Collections

### 1. `applications`
The heart of the recruitment engine. 
- **Pattern:** Uses the **Snapshot Pattern**. It embeds immutable copies of `jobSnapshot` and `candidateSnapshot`.
- **References:** Maintains `jobId` and `candidateId` for global analytics.
- **Indexes:** Indexed heavily on `companyId`, `status`, and `jobId` for recruiter inbox filtering.

### 2. `jobs`
Represents a living business entity.
- **Pattern:** Uses the **Attribute Pattern** for `skills` and `technologies`.
- **Search:** Implements full-text search indexing on `searchMetadata` for lightning-fast candidate job discovery.

### 3. `career_profiles`
The global profile of a candidate.
- **Pattern:** Highly nested arrays (Experience, Education). We cap array sizes using application logic to prevent unbounded document growth (MongoDB 16MB limit).

### 4. `timeline_events`
Global audit log.
- **Pattern:** **Polymorphic Pattern**. Uses `entityType` (APPLICATION, JOB, USER) and `entityId`. Indexed on both to allow ultra-fast retrieval of histories for any specific entity, or global retrieval by `actorId`.

## Aggregation Pipelines
RecruitPilot actively avoids N+1 queries. We rely heavily on MongoDB Aggregation Pipelines (`$match`, `$group`, `$project`) in the `RecruitmentAnalyticsModule` to calculate funnel conversion rates, hiring velocities, and recruiter leaderboards directly at the database level.
