import { Avtale, Maal, Oppgave } from '../AvtaleSide/avtale';

const maalListe: Maal[] = [
    {
        id: 'c9697a6f-f3fe-4436-a9d9-959ab6e5bcbe',
        opprettetTimestamp: 1353253214,
        kategori: 'Arbeidserfaring',
        beskrivelse: 'Trenger arbeidserfaring',
    },
    {
        id: '26cfdb72-1efd-11e9-ab14-d663bd873d93',
        opprettetTimestamp: 1353253214,
        kategori: 'Annet',
        beskrivelse: 'Hadde vært fint med noe annet også',
    },
];

const oppgaveListe: Oppgave[] = [
    {
        id: 'a1a98572-6771-467a-99f1-141870c286cc',
        opprettetTimestamp: 1353253214,
        tittel: 'Flytte varer',
        beskrivelse: 'skal flytte varer',
        opplaering: 'for å flytte varer',
    },
];

const avtaleMock: Avtale = {
    id: '9565e74d-66f3-44a1-8a3c-91fae6b450d3',
    opprettetTidspunkt: '4 uker siden',
    versjon: '34',

    godkjentAvDeltaker: false,
    godkjentAvArbeidsgiver: false,
    godkjentAvVeileder: false,

    oppfolging: 'Bruker og AG skal følges opp',
    tilrettelegging: 'AG skal tilrettelegge',

    startDatoTimestamp: 99,
    startDatoTidspunkt: 99,
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

    maal: maalListe,
    oppgaver: oppgaveListe,
};

export default avtaleMock;
