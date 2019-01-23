TAG - Tiltaksgjennomføring
===========================
[![CircleCI](https://circleci.com/gh/navikt/tiltaksgjennomforing.svg?style=svg)](https://circleci.com/gh/navikt/tiltaksgjennomforing)

Starte via NPM med REST-API (krever at https://github.com/navikt/tiltaksgjennomforing-backend også kjører lokalt).
`npm start`

Starte med mocket backend 
`npm run mock`

Starte via NPM med Firebase
`REACT_APP_FIREBASE=true npm start` 

Bygg image
`docker build -t tiltaksgjennomforing .`

Kjør container
`docker run -d -p 3000:3000 tiltaksgjennomforing`

Åpnes i browser: [http://localhost:3000/](http://localhost:3000/)

### Deploy på NAIS
CircleCI bygger og pusher Docker image. For å deploye må man sette opp Kubernetes/kubectl konfigurasjon lokalt (se: https://github.com/navikt/kubeconfigs/), finne versjonsnummer på image i Docker hub, og så kjøre kommandoen: `kubectl apply -f nais-[miljø].yaml` 

## Firebase

### Oppsett
Installer firebase-klienten: `npm i -g firebase-tools`
Logg inn med Google-konto: `firebase login`
Re-run installeringskommandoen for å få siste versjon: `npm i -g firebase-tools`

### Deploy
`npm run build && firebase deploy`

### Kjøre med Firebase lokalt
`npm run build && firebase serve`