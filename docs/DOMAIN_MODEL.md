# Domain Model

RecruitPilot is modeled strictly around B2B SaaS boundaries.

## 1. Tenant Domain (B2B SaaS Core)
- **Company:** The root entity for the B2B side. Every Job, Application, and Recruiter belongs to a Company.
- **User:** Represents the B2B identity (Recruiters, Hiring Managers). Users have Roles and Permissions scoped to a Company.

## 2. Talent Domain (B2C Core)
- **Candidate:** The root identity for the B2C side. Candidates do not belong to Companies.
- **Career Profile:** The global, living resume of the Candidate.
- **Document:** Resumes, portfolios, cover letters.

## 3. Master Data Domain (Taxonomy)
- **Skill / Technology / Location:** Global taxonomic dictionaries. Both Candidates and Jobs reference these to establish a common language across the platform, essential for AI matching.

## 4. Job Domain (Recruitment)
- **Job:** A living recruitment entity belonging to a Company. Tracks requirements, compensation, and hiring teams.
- **Job Template:** Blueprints for standardizing job creation across a Company.

## 5. Application Domain (The Intersection)
- **Application:** The relationship between a Candidate and a Job. Maintains its own lifecycle (Submitted -> Hired) and embeds immutable snapshots of the Candidate and Job at the moment of creation.

## 6. Workspace Domain (Orchestration)
- **Saved Views:** Custom UI configurations for recruiters.
- **Timeline Events:** Audit trails crossing all domains.
