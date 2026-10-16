# AGENTS.md — tiltaksgjennomforing

Tiltaksgjennomføring is Nav’s digital service for agreements about employment support measures. Participants, employers and Nav advisers use it to create, complete, approve and follow up agreements. Decision-makers use it to process funding periods.

This repository is the frontend for [tiltaksgjennomforing-api](https://github.com/navikt/tiltaksgjennomforing-api). The React app in `src/` calls the API through the Express server in `server/`. The server exchanges the user's token for an on-behalf-of token before forwarding requests to the API.

The same codebase is deployed as two Nais applications with separate views:

- **Internal (`tiltaksgjennomforing-intern`)** is for Nav employees: advisers (`VEILEDER`) and decision-makers (`BESLUTTER`). Users log in with Azure AD, and the app runs with the Modia decorator (`ENABLE_INTERNAL_MENU`). See `nais/nais-gcp-intern.yaml`.
- **External (`tiltaksgjennomforing`)** is for employers (`ARBEIDSGIVER`), participants (`DELTAKER`) and mentors (`MENTOR`). Users log in with ID-porten, tokens are exchanged with TokenX, and the app runs with the nav.no decorator (`ENABLE_EXTERNAL_MENU`). Employer access is controlled through Altinn. See `nais/nais-gcp-ekstern.yaml`.

The frontend selects the view from the logged-in user's role (`innloggetBruker.rolle`), for example in `src/Oversikt.tsx` and `src/AvtaleSide/AvtaleSide.tsx`. This role check only controls what is shown. Access control is enforced by the API, so hiding a button is never a security control.

## Setup & Local Development

- `@navikt` packages are installed from GitHub Packages. This requires a GitHub PAT with `read:packages` (see `README.md`).
- `server/` is a separate pnpm project with its own `package.json` and lockfile. Run `pnpm install` in both the root and `server/`.
- `pnpm start` in the root starts Vite at `http://localhost:3000/tiltaksgjennomforing`. It expects `tiltaksgjennomforing-api` to run locally.
- The Express server is built with `pnpm build` in `server/` and started with `pnpm run start:labs`, `pnpm run start:ekstern` or `pnpm run start:intern`.

### Labs mode

`LABS=true` (`IS_LABS` in `server/src/config.ts`) runs the app against `tiltaksgjennomforing-api-labs` with fake login (`server/src/proxy/labs-proxy.ts`). It is deployed with `nais/dev-gcp-labs.yaml`. Mock data lives in `src/mocking/` and `server/src/mock/`.

## Build & Test Commands

```bash
pnpm ts             # Type check
pnpm prettier       # Check formatting
pnpm prettier:fix   # Fix formatting
pnpm test           # Run tests
pnpm build          # Build
pnpm storybook      # Run Storybook
```

CI (`.github/workflows/bygg-branch.yml`) runs `pnpm ts`, `pnpm prettier` and `pnpm test`. Run all three before committing.

## Project Structure

```text
_scripts/
nais/       # Nais manifests
public/
server/     # Express server: auth, proxies, decorators
src/        # React app
```

Nais manifests come in two kinds:

- `nais/nais-gcp-intern.yaml` and `nais/nais-gcp-ekstern.yaml` are the templates for the internal and external app. Edit these to change the application spec.
- `nais/dev-*.yaml` and `nais/prod-*.yaml` hold environment-specific values such as URLs, scopes and ingresses.

## Testing

- Tests use Vitest with jsdom and Testing Library.
- Test files are named `*.spec.ts` or `*.spec.tsx` and live next to the code they test.
- `server/` has no tests.

## Patterns

- **Styling:** Aksel components (`@navikt/ds-react`) with Less. New styles go in CSS modules (`*.module.less`). Use `classnames` to combine classes.
- **API calls:** Imperative calls go in `src/services/rest-service.ts`. SWR hooks for reads go in `src/services/use-rest.ts`. Both map HTTP errors to typed errors from `src/types/errors.ts`. Do not add a third API client.
- **State:** `InnloggetBrukerContext` (`src/InnloggingBoundary/`) provides the logged-in user. `AvtaleContext` (`src/AvtaleProvider.tsx`) provides the agreement and its actions.
- **Forms:** `react-hook-form` with `zod` for validation.
- **Feature toggles:** Add new toggles to `FeatureToggleProviderInitialState` in `src/FeatureToggles/FeatureToggleProvider.tsx`, and read them with `useFeatureToggles()`. The toggle must also exist in the backend. `useMigreringSkrivebeskyttet` makes agreements for some measure types read-only during migration.
- **Storybook:** Stories live in `src/stories/` and are deployed separately. Add or update stories when changing agreement status views.

## Domain Glossary

The code uses Norwegian domain terms. Types live in `src/types/`.

| Term             | Meaning                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------- |
| avtale           | Agreement about an employment support measure (`Avtale`)                                     |
| tiltakstype      | Type of measure, for example `ARBEIDSTRENING` or `MIDLERTIDIG_LONNSTILSKUDD` (`TiltaksType`) |
| deltaker         | Participant in the measure                                                                   |
| arbeidsgiver     | Employer, represented by a company (`bedriftNr`)                                             |
| veileder         | Nav adviser who follows up the agreement                                                     |
| beslutter        | Nav decision-maker who approves funding periods                                              |
| mentor           | Mentor for the participant                                                                   |
| godkjenning      | Approval of the agreement by a party                                                         |
| inngått          | The agreement is concluded after all parties have approved it                                |
| tilskuddsperiode | Funding period that the decision-maker approves or returns (`TilskuddsPeriode`)              |
| annullere        | Cancel an agreement                                                                          |
| steg             | Step in the agreement form (`StegId`)                                                        |

## Code Style

### Minimal Editing

When fixing a bug or implementing a feature, change only what is necessary.
Do not rename variables, restructure working code, or refactor beyond the task at hand.
Keep diffs small and focused so they are easy to review.

## Git Workflow

- Keep commits as small as possible.
- Create separate branches for features and fixes.
- Never commit directly to `main` or `master`.
- Keep commit messages short, descriptive, one line with a period at the end.

## Boundaries

### ✅ Always

- Run `pnpm ts`, `pnpm prettier:fix` and `pnpm test` after changes
- Follow existing code patterns in the project
- Preserve existing code structure — do not reorganize or refactor beyond the task
- Validate all external input

### ⚠️ Ask First

- Changing authentication mechanisms
- Changing `server/src/auth.ts`, `server/src/proxy/*` or `server/src/routes.ts`. The server is the trust boundary between the user's token and the API
- Changing CSP or `helmet` settings in `server/src/server.ts`
- Adding new dependencies
- Changing API contracts or types in `src/types/` that mirror the backend

### 🚫 Never

- Commit secrets or credentials
- Skip input validation on external boundaries
- Never use npm or npx. Use pnpm instead.
