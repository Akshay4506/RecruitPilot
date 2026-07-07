# Recruitment Workflow

The lifecycle of a Job and Application in RecruitPilot.

## 1. Job Lifecycle
1. **DRAFT:** A Recruiter or Hiring Manager creates a Job. It can be populated from a Job Template.
2. **PENDING_APPROVAL:** The Job is submitted for budget/HR approval.
3. **APPROVED:** The Job is approved but not yet visible to candidates.
4. **PUBLISHED:** The Job is active and searchable in the candidate portal.
5. **PAUSED:** Temporarily hidden from search while recruiters process a backlog of applications.
6. **CLOSED:** The position is filled, or hiring is cancelled.

## 2. Application Lifecycle
1. **SUBMITTED:** The candidate applies. An immutable snapshot of their profile and the job is saved.
2. **UNDER_REVIEW:** A recruiter begins evaluating the candidate.
3. **SHORTLISTED:** The candidate passes initial screening and is moved forward.
4. **INTERVIEW:** The candidate is scheduled for interviews.
5. **OFFER:** An offer letter is generated and sent.
6. **HIRED:** The candidate accepts the offer. The application is closed.
7. **REJECTED:** The candidate is declined.
8. **WITHDRAWN:** The candidate voluntarily removes themselves from consideration.

All state transitions are validated by `ApplicationLifecycleService` or `JobLifecycleService` to prevent invalid jumps (e.g., DRAFT -> CLOSED).
