# Tiltaksgjennomføring

Starte via Yarn med REST-API (krever at https://github.com/navikt/tiltaksgjennomforing-api også kjører lokalt).
`yarn start`

Starte med mocket backend
`yarn run mock`

Starte med ordinær backend
`yarn run server`

Bygg image
`docker build -t tiltaksgjennomforing .`

Kjør container
`docker run -d -p 3000:3000 tiltaksgjennomforing`

Åpnes i browser: [http://localhost:3000/tiltaksgjennomforing](http://localhost:3000/tiltaksgjennomforing)

### Testing

Vi bruker jest for å teste. `yarn test` kjører testene og setter dem i watch modus.

Enkle regler for testing her:

-   Alle `.tsx`-filer skal ha en tilsvarende `spec.tsx`-fil. Disse filene skal inneholde en komponent
    som default export. Andre funksjoner exporteres utenom for å testes i egen tester.
-   Kun lag en rendertest per `spec.tsx`-fil om du har behov for å teste at variasjoner rendrer riktig
    kan det godt være at du har lagt deg på feil abstraksonsnivå. Logikk bør wrappes i funksjoner og testes
    i egne tester i `spec.tsx`-fila.
