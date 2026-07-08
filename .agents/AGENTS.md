# Rules & Constraints

- **Imports:** Do NOT use barrel imports (e.g. `import { X } from "@/components"`). Use direct imports (e.g. `import { X } from "@/components/ui/x"`). Large React/Next.js projects often avoid giant `index.ts` barrel files to prevent circular dependencies, slower builds, and SSR quirks.
- **Component Reusability:** Never create a new component if an existing one can be composed or extended. Always search the project first.
- **Page States:** Every page must support Loading, Empty, Error, and Success states.
- **Verification:** Every page must pass both `npx tsc --noEmit` and `npm run build` before considering the task complete.
