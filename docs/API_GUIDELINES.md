# API Guidelines

## 1. RESTful Standards
- **Nouns, not verbs:** Use `/candidates` instead of `/getCandidates`.
- **Pluralization:** Keep resource names plural (e.g. `/companies/:id`, not `/company/:id`).
- **Nesting:** Sub-resources should be nested intuitively (e.g. `/api/v1/candidate/profile/experience`).

## 2. Response Format
Every endpoint must return a structured response DTO. Raw data or plain arrays should never be returned at the root level.
```json
{
  "success": true,
  "data": {
    "key": "value"
  },
  "message": "Optional success message",
  "meta": {
    "pagination": { "page": 1, "total": 10 }
  }
}
```
Errors are handled globally by NestJS Exception Filters and return standard HTTP Status Codes.

## 3. Versioning
All APIs are versioned in the URI: `/api/v1/...`

## 4. Documentation
We use `@nestjs/swagger` for API documentation. Every endpoint MUST include:
- `@ApiTags('Domain')` on the Controller.
- `@ApiOperation({ summary: '...' })` on the method.
- `@ApiBearerAuth()` for secured routes.

## 5. Security & Authentication
- **B2B Endpoints:** Protected by `JwtAuthGuard`. The user's tenant context (`organizationId`) is extracted from the JWT.
- **Candidate Endpoints:** Protected by `CandidateJwtAuthGuard`. The candidate's `candidateId` is strictly extracted from the token, ignoring any path parameters for security.
- **Role Guards:** Use `@Roles(Role.ADMIN)` for elevated privileges.
