import { Avtale } from '../AvtaleSide/avtale';

const avtaleMock: Avtale = {

    id: '9565e74d-66f3-44a1-8a3c-91fae6b450d3',
    opprettetTidspunkt: '4 uker siden',
    versjon: '34',

    bekreftetAvBruker: false,
    bekreftetAvArbeidsgiver: false,
    bekreftetAvVeileder: false,

    oppfolging: 'Bruker og AG skal følges opp',
    tilrettelegging: 'AG skal tilrettelegge',

    startDatoTimestamp: 99,
    arbeidstreningLengde: 8,
    arbeidstreningStillingprosent: 99,

    veilederNavIdent: 'Z123456',
    veilederFornavn: 'Nav',
    veilederEtternavn: 'Navesen',
    veilederEpost: 'nav.navesen@nav.no',
    veilederTlf: '88888888',

    bedriftNavn: 'Arbeid AS',
    bedriftAdresse: 'Arbeidsveien 24',
    bedriftPostnummer: '1234',
    bedriftPoststed: 'Oslo',

    deltakerFornavn: 'Deltaker',
    deltakerEtternavn: 'Deltakersen',
    deltakerAdresse: 'Deltakerveien 55',
    deltakerPostnummer: '4321',
    deltakerPoststed: 'Oslo',
    deltakerFnr: '00000000000',

    arbeidsgiverFnr: '00000000000',
    arbeidsgiverFornavn: 'Arbeidsgiver',
    arbeidsgiverEtternavn: 'Arbeidsgiversen',
    arbeidsgiverEpost: 'arbeidsgiver.arbeidsgiversen@arbeid.no',
    arbeidsgiverTlf: '77777777',

    maal: [],
    oppgaver: [],
};

export default avtaleMock;