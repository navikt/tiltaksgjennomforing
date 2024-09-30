export const miljo = () => {
    switch (window.location.hostname) {
        case 'arbeidsgiver.nav.no':
        case 'tiltaksgjennomforing.intern.nav.no':
            return 'prod';
        case 'tiltaksgjennomforing.dev.intern.nav.no':
        case 'tiltaksgjennomforing.dev.ekstern.nav.no':
            return 'dev';
        default:
            return 'local';
    }
};
