# Module Dependencies

To avoid circular dependencies and tight coupling, RecruitPilot follows a strict dependency graph.

## 1. Core Modules (No Upstream Dependencies)
These modules only depend on Mongoose schemas and standard libraries.
- `AuthModule`
- `MasterDataModule` (Skills, Locations, Technologies)
- `DocumentModule`
- `TimelineModule`

## 2. Feature Modules (Depend on Core)
These represent business domains.
- `JobModule` (Depends on MasterData)
- `CareerProfileModule` (Depends on MasterData, Document)

## 3. Intersection Modules (Depend on Features)
These map features together.
- `ApplicationModule` (Depends on JobModule, CareerProfileModule, DocumentModule)

## 4. Orchestration Modules (Top Level)
These power the UI by pulling from everywhere.
- `RecruiterWorkspaceModule` (Depends on ApplicationModule, JobModule, TimelineModule)
- `RecruitmentAnalyticsModule` (Depends on ApplicationModule, JobModule)

## The Golden Rule
An Orchestration Module can import an Intersection Module or a Feature Module, but a Feature Module can NEVER import an Orchestration Module. If a Feature Module needs to trigger an action in an Orchestration Module, it must fire an Event (`@nestjs/event-emitter`), which the Orchestration Module listens to.
