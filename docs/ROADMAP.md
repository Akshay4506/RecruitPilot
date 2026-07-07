# Technical Roadmap

RecruitPilot has established a rock-solid foundation across Milestones 1, 2, and 3. The platform can securely authenticate B2B/B2C users, manage complex talent profiles, process job applications safely via immutable snapshots, provide a unified workspace for recruiters, and generate real-time analytics.

## Future Milestones

### Milestone 4: Advanced Orchestration & Intelligence
- **Assessment Engine:** Pluggable module for coding tests, behavioral assessments, and one-way video interviews.
- **Interview Scheduling:** Bi-directional calendar sync (Google/Outlook API integration).
- **Offer Management:** Document generation, e-signatures, and compensation approvals.
- **AI Matchmaking:** Integrating vector databases (e.g., Pinecone or Qdrant) with the Candidate and Job snapshots to generate predictive match scores.

### Milestone 5: Automation & Outreach
- **Email Sequences:** Automated drip campaigns to source candidates.
- **Rules Engine:** Allowing recruiters to say "If Candidate has >5 years Node.js experience, automatically move to Shortlisted."

### Technical Debt & Enhancements
- **Redis Caching:** Introduce caching for `DashboardMetricsService` and `MasterDataModule` to reduce MongoDB load.
- **Event Sourcing:** Currently, we use events for side-effects. In the future, we may want to implement true Event Sourcing for the Application lifecycle to allow complete state rebuilds.
- **Microservice Extraction:** If the `ApplicationModule` becomes too heavy, the modular monolith design ensures it can be cleanly detached into a separate microservice communicating via gRPC or Kafka.
