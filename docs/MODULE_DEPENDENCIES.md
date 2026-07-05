# Module Dependencies

The RecruitPilot backend enforces strict module boundaries to prevent circular dependencies and spaghetti code. 

## Platform (Core) Modules
These modules provide generic utilities and are consumed by multiple domains. They do not depend on domain modules.
- **StorageModule:** Handles binary file uploads.
- **TimelineModule:** Consumes events to build activity streams.
- **ReferenceModule (Master Data):** Manages canonical lists (Skills, Companies, Locations). Used heavily for AI matching and search.

## Domain Modules
These handle core business logic and may depend on Platform Modules.

### 1. B2B Domain (Company)
- **AuthModule:** Handles recruiter authentication.
- **WorkspaceModule:** Manages tenant logic and RBAC.
- **CompanyModule:** Company profiles and settings.

### 2. B2C Domain (Candidate)
- **CandidateAuthModule:** Dedicated JWT strategy and endpoints for candidates.
- **CandidateModule:** Core identity, preferences, and dashboard orchestration.
- **CareerProfileModule:** Houses reusable embedded schemas (Experience, Education) and the `ProfileAggregatorService`.
- **DocumentModule:** Reusable platform service for handling resumes, certificates, and attachments via polymorphic ownership.

## Dependency Rules
1. **No Circular Dependencies:** A module cannot depend on a module that depends on it. Use Event Emitters to break cycles.
2. **Aggregator Services:** Cross-domain data fetching is handled by Aggregator or Dashboard services (e.g., `DashboardService`) rather than bleeding external domain logic into a controller.
