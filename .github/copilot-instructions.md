**Available Agents:**
- `Frontend Designer` -- Creates framework-agnostic UI/UX specifications
- `Expert React Frontend Engineer` -- Implements React components with TypeScript and modern patterns
- `React Tester` -- Writes Vitest + React Testing Library tests
- `Frontend Accessibility Reviewer` -- Audits for WCAG violations and strengthens a11y coverage

**Available Prompts:**
- `/UX Brief To Handoff` -- Generate a design brief and implementation handoff plan
- `/React Test Plan` -- Create a comprehensive test plan before implementation

**Workflow:**
1. Start each planning stage with a design brief using `UX Brief To Handoff` prompt
2. Save briefs to `PLAN.md` for reference and iteration
3. Delegate to `Frontend Designer` for UX guidance, `Expert React Frontend Engineer` for implementation, `React Tester` for tests, and `Frontend Accessibility Reviewer` for audits
4. Follow the plan -> design -> implement -> test -> audit -> verify cycle at each stage
