# API Guidelines

All controllers in RecruitPilot adhere to strict enterprise API standards.

## 1. Request Validation
- All incoming payloads must be validated using `class-validator` DTOs (Data Transfer Objects).
- We use a global `ValidationPipe` with `whitelist: true` to automatically strip any fields from the request that are not explicitly defined in the DTO, preventing NoSQL injection and mass-assignment vulnerabilities.

## 2. Authentication & Authorization
- Every endpoint (except public candidate registration/login) must be protected by a `JwtAuthGuard`.
- B2B endpoints expect `req.user` to contain `organizationId` and `userId`.
- B2C endpoints expect `req.user` to contain `candidateId`.
- **Company Isolation:** A B2B controller must NEVER trust the client to provide the `companyId` in the body. It must always extract `req.user.organizationId` from the verified JWT.

## 3. Response Format
All successful responses follow a standardized format:
```json
{
  "success": true,
  "data": { ... },
  "meta": { "total": 100, "page": 1 } // Optional pagination
}
```

## 4. Exception Handling
- We rely on NestJS built-in exceptions (`BadRequestException`, `NotFoundException`, `UnauthorizedException`).
- A global `AllExceptionsFilter` catches these, logs them securely, and formats the error for the client:
```json
{
  "success": false,
  "error": {
    "code": "BAD_REQUEST",
    "message": "Invalid pipeline stage"
  }
}
```

## 5. Swagger Documentation
- Every endpoint, DTO, and enum must be decorated with `@ApiTags`, `@ApiOperation`, and `@ApiProperty` to generate live OpenAPI documentation for the frontend team.
