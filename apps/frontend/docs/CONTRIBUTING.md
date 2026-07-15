# Contributing Guide

Welcome to the RecruitPilot frontend repository. 

## Golden Rules
1. **No new UI Architecture:** The frontend UI, styling system, and component library are officially **frozen**. Do not introduce new design primitives, new CSS-in-JS libraries, or alternative UI frameworks.
2. **Reuse Existing Components:** Before building a custom component, search the `components/ui/` folder or existing feature components.
3. **Feature-Sliced Design:** All new domain logic must go into a new `features/[name]/` directory. Never pollute the global `components/` directory with domain-specific logic.

## Branching & PRs
- Create feature branches off `main`.
- Ensure all CI checks pass (`npm run lint`, `npx tsc --noEmit`, `npm run build`) before requesting a review.
- Include screenshots or videos for visual changes.

## Writing Tests
- All complex business logic in `lib/` or `hooks/` must have unit tests.
- UI components should be tested for accessibility using standard Axe tools.
