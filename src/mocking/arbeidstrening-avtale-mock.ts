import { ArbeidstreningAvtaleinnhold, Avtale, Maal, Oppgave } from '@/types/avtale';

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

const arbeidstreningAvtaleMock: Avtale<ArbeidstreningAvtaleinnhold> = {
    id: '9565e74d-66f3-44a1-8a3c-91fae6b450d3',
    opprettetTidspunkt: '',
    sistEndret: '',

    godkjentAvDeltaker: false,
    godkjentAvArbeidsgiver: false,
    godkjentAvVeileder: false,
    erLaast: false,
    status: '',
    kanAvbrytes: true,
    kanLaasesOpp: false,
    versjon: 1,
    versjoner: [],
    avbrutt: false,
    godkjentPaVegneAv: false,

    godkjentPaVegneGrunn: {
        ikkeBankId: false,
        reservert: false,
        digitalKompetanse: false,
    },

    oppfolging: 'Bruker og AG skal følges opp',
    tilrettelegging: 'AG skal tilrettelegge',

    startDato: 99,
    sluttDato: 99,
    stillingprosent: 99,

    veilederNavIdent: 'Z123456',
    veilederFornavn: 'Nav',
    veilederEtternavn: 'Navesen',
    veilederTlf: '88888888',

    bedriftNavn: 'Arbeid AS',
    bedriftNr: '12345678',

    deltakerFornavn: 'Deltaker',
    deltakerEtternavn: 'Deltakersen',
    deltakerFnr: '00000000000',
    deltakerTlf: '44444444',

    arbeidsgiverFornavn: 'Arbeidsgiver',
    arbeidsgiverEtternavn: 'Arbeidsgiversen',
    arbeidsgiverTlf: '77777777',
    tiltakstype: 'ARBEIDSTRENING',

    maal: maalListe,
    oppgaver: oppgaveListe,
};

export default arbeidstreningAvtaleMock;
