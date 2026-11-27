# Tiltaksgjennomføring

Starte via pnpm med REST-API (krever at https://github.com/navikt/tiltaksgjennomforing-api også kjører lokalt).
`pnpm run start`

Åpnes i browser: [http://localhost:3000/tiltaksgjennomforing](http://localhost:3000/tiltaksgjennomforing)

## PNPM

```bash
corepack enable pnpm
pnpm config --global set minimumReleaseAge 4320
```

~ https://aksel.nav.no/god-praksis/artikler/golden-path-frontend

## Installere

Før du kjører `pnpm install` i rot eller `server/` må du sette opp autentisering mot `@navikt`.

`@navikt` pakker publiseres nå kun i GitHub Packages registry'et.
For å kunne installere nyere versjoner må pakker fra @navikt-orgen scopes til GitHub Packages.

1. Opprett et [PAT på github](https://github.com/settings/tokens) med `read:packages` scope.
2. Kjør `pnpm login --registry=https://npm.pkg.github.com` (bruk PAT fra forrige steg som passord ved login).
3. Installer avhengigheter med `pnpm install` i prosjektroten og `pnpm install` i `server/`.

## Sjekke endringer

Kjør `pnpm run check` etter endringer. Den kjører de samme sjekkene som CI og bygger frontend, server og Storybook.

`pnpm run verify` nullstiller alt først: den kjører `clean`, installerer på nytt i roten og i `server/` og kjører så `check`. Den trenger tilgang til GitHub Packages. Den sletter også `node_modules`, så dev-servere som kjører (Vite, Storybook, Express) slutter å virke og må startes på nytt.

| Script        | Hva det gjør                                                           |
| ------------- | ---------------------------------------------------------------------- |
| `ts`          | Typesjekk med `tsc -b` (dekker også `server/`)                         |
| `prettier`    | Sjekker formatering                                                    |
| `test`        | Kjører testene med Vitest                                              |
| `build:all`   | Bygger frontend, server og Storybook                                   |
| `install:all` | `pnpm install --frozen-lockfile` i roten og i `server/`                |
| `clean`       | Sletter `node_modules`, `dist` og `storybook-static`, også i `server/` |

## Sporing

Applikasjonen bruker Innblikk-sporing for sidevisninger. Sporing lastes først etter samtykke til analytics.
