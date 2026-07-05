# Database Design

The database relies on MongoDB. We leverage a mix of normalized canonical collections and denormalized embedded schemas optimized for read-heavy operations (Dashboards, AI Search).

## 1. Master Data (Normalized)
We use a canonical data model for entities that require autocomplete, AI matching, or analytics.
- **Collections:** `skills`, `technologies`, `job-titles`, `companies`, `locations`, `industries`, `institutions`, `degrees`, `employment-types`, `languages`.
- **Design:** Instead of free-text strings, profiles store `ObjectId` references to these collections. They feature native Text Indexes for fast search.

## 2. Polymorphic Ownership
Certain entities must be owned by multiple types of users (e.g., a Candidate can own a Project, but a Company can also own a Project).
- **Implementation:** We use `ownerType` (String enum: 'CANDIDATE', 'COMPANY') and `ownerId` (ObjectId) to create flexible, generic collections.
- **Examples:** `documents`, `projects`, `timeline_events`.

## 3. Embedded Subdocuments (Denormalized)
To optimize the retrieval of a Candidate's career profile without triggering massive multi-collection `$lookup` pipelines, we embed highly coupled data.
- **Collection:** `candidates`
- **Embedded Arrays:** `experiences`, `educations`, `skills`, `certifications`, `languages`.
- **Note:** Embedded items maintain stable inner `_id` values to support targeted updates and deletions.

## 4. RBAC & Multi-Tenancy
- **Organizations/Workspaces:** The root tenant.
- **Users:** Recruiter accounts. Linked to a Workspace via `organizationId`.
- **Roles:** Defined via an enum array on the User document (`ADMIN`, `RECRUITER`, `VIEWER`), secured at the route level via `@Roles()` guards.
