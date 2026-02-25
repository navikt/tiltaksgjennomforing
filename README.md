# Tiltaksgjennomføring

Starte via npm med REST-API (krever at https://github.com/navikt/tiltaksgjennomforing-api også kjører lokalt).
`npm run start`

Åpnes i browser: [http://localhost:3000/tiltaksgjennomforing](http://localhost:3000/tiltaksgjennomforing)

## Installere

Før du kjører `install` så må du sette opp autentisering mot @navikt.

`@navikt` pakker publiseres nå kun i GitHub Packages registry'et.
For å kunne installere nyere versjoner må pakker fra @navikt-orgen scopes til GitHub Packages.

1. Opprett et [PAT på github](https://github.com/settings/tokens) med `read:package` scope
2. Kjør `npm login --registry=https://npm.pkg.github.com --auth-type=legacy` (bruk PAT fra forrige steg som passord ved login)
3. Legg til `@navikt:registry=https://npm.pkg.github.com` i `.npmrc`.
