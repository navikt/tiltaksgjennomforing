## TypeScript

- TypeScript strict mode — no `any` without justification
- Named imports from `@navikt/ds-react`, never `import *`

## Styling

- Use Aksel components and tokens where they fit
- New styles go in CSS modules (`*.module.less`), combined with `classnames`

## Norwegian text (all `.md` and user-facing strings)

- Use Norwegian bokmål for user-facing text
- Avoid unnecessary anglicisms when good Norwegian alternatives exist

## Security

- No secrets, tokens, or credentials in code
- No personal data (fødselsnummer, names) in logs
- Use synthetic data (fødselsnummer, names) in tests
- Changes to `server/src/auth.ts`, `server/src/proxy/*` or `server/src/routes.ts` need extra scrutiny: the server is the trust boundary between the user's token and the API
- Hiding UI based on `innloggetBruker.rolle` is not access control; the API enforces access
- Third-party GitHub Actions (outside `actions/*` and `nais/*`) must be pinned to a full SHA with a version comment

## Over-editing

Flag changes where the diff is disproportionate to the stated goal:

- Renamed variables or parameters not related to the fix
- Restructured working code without justification
- Added refactoring outside the PR scope
