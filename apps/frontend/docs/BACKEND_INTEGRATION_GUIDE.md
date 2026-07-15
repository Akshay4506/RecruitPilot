# Backend Integration Guide (Milestone 5+)

RecruitPilot's frontend is entirely decoupled from the backend implementation through a strict layered architecture. This guide details how to replace the existing mock services with real API endpoints during Milestone 5.

## The Architecture Layer
```text
UI Component -> React Query Hook -> Service Interface -> API Service implementation -> Backend
```

### 1. DTOs (Data Transfer Objects)
Located in `features/[name]/services/[name].dto.ts`. 
These types represent the exact JSON payload expected from the backend. When integrating a real backend, ensure these types strictly match the OpenAPI/Swagger specs of the backend.

### 2. Service Interfaces
Located in `features/[name]/services/[name].service.ts`.
This defines the contract. Example:
```ts
export interface JobsService {
  getAll: (filters?: any) => Promise<PaginatedResponse<Job>>;
  getById: (id: string) => Promise<Job>;
  create: (data: any) => Promise<Job>;
  update: (id: string, data: any) => Promise<Job>;
}
```

### 3. The Implementation (Mock vs API)
Currently, `features/[name]/mock/[name].service.ts` implements this interface using static data.

**To integrate the real backend:**
1. Create `features/[name]/services/[name].api.ts`.
2. Implement the interface using `fetch` or `axios`.
3. Example:
```ts
export const apiJobsService: JobsService = {
  getAll: async (filters) => {
    const res = await fetch('/api/jobs');
    return res.json();
  },
  // ...
};
```

### 4. Hook Injection
In `features/[name]/hooks/use-[name].ts`, swap the import:
```diff
- import { mockJobsService as service } from "../mock/jobs.service";
+ import { apiJobsService as service } from "../services/jobs.api";
```
*(Or use an environment variable toggle like `process.env.NEXT_PUBLIC_USE_MOCKS` to swap them at runtime).*

## Rules for Milestone 5
1. **DO NOT modify the React Components.** If data is missing, adapt the API response in the `api.ts` service layer to match the expected DTO.
2. **DO NOT modify the React Query Hooks** unless absolutely necessary for new cache invalidation rules.
3. The UI is frozen. The only code changes should occur inside `services/*.api.ts` and `hooks/*.ts`.
