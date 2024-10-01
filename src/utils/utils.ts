export const miljo = () => {
    switch (window.location.hostname) {
        case 'arbeidsgiver.nav.no':
        case 'tiltaksgjennomforing.intern.nav.no':
            return 'prod';
        case 'tiltaksgjennomforing.intern.dev.nav.no':
        case 'tiltaksgjennomforing.ekstern.dev.nav.no':
            return 'dev';
        default:
            return 'local';
    }
};
