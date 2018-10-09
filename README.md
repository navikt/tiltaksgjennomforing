#TAG - Tiltaksgjennomføring
===========================
[![CircleCI](https://circleci.com/gh/navikt/tiltaksgjennomforing.svg?style=svg)](https://circleci.com/gh/navikt/tiltaksgjennomforing)

Bygg image
`docker build -t tiltaksgjennomforing .`

Kjør container
`docker run -d -p 8080:80 tiltaksgjennomforing`

Åpnes i browser: [http://localhost:8080/](http://localhost:8080/)

### Deploy
Last opp nais.yaml i Nexus
`nais upload --app tiltaksgjennomforing --version <versjon>`

Deploy
`curl -s -S -k -d '{"application": "tiltaksgjennomforing", "version": "<versjon>", "zone": "sbs", "skipFasit": true, "fasitEnvironment": "q0"}' https://daemon.nais.oera-q.local/deploy`
