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
2. Kjør `pnpm login --registry=https://npm.pkg.github.com --auth-type=legacy` (bruk PAT fra forrige steg som passord ved login).
3. Installer avhengigheter med `pnpm install` i prosjektroten og `pnpm install` i `server/`.
