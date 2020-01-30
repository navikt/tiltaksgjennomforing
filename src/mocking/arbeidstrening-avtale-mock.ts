import { ArbeidstreningAvtaleinnhold, Avtale, Maal, Oppgave } from '@/types/avtale';

const maalListe: Maal[] = [
    {
        id: 'c9697a6f-f3fe-4436-a9d9-959ab6e5bcbe',
        kategori: 'ARBEIDSERFARING',
        beskrivelse: 'Trenger arbeidserfaring',
    },
    {
        id: '26cfdb72-1efd-11e9-ab14-d663bd873d93',
        kategori: 'ANNET',
        beskrivelse: 'Hadde vært fint med noe annet også',
    },
];

const oppgaveListe: Oppgave[] = [
    {
        id: 'a1a98572-6771-467a-99f1-141870c286cc',
        tittel: 'Flytte varer',
        beskrivelse: 'skal flytte varer',
        opplaering: 'for å flytte varer',
    },
];

const arbeidstreningAvtaleMock: Avtale<ArbeidstreningAvtaleinnhold> = {
    id: '0',
    opprettetTidspunkt: '2020-01-01T00:00:00.000000',
    sistEndret: '2020-01-01T00:00:00.000000',

    godkjentAvDeltaker: false,
    godkjentAvArbeidsgiver: false,
    godkjentAvVeileder: false,
    erLaast: false,
    status: 'Påbegynt',
    kanAvbrytes: true,
    kanLåsesOpp: false,
    versjon: 1,
    versjoner: [],
    avbrutt: false,
    godkjentPaVegneAv: false,

    godkjentPaVegneGrunn: undefined,

    oppfolging: 'Bruker og AG skal følges opp',
    tilrettelegging: 'AG skal tilrettelegge',

    startDato: '2020-02-01',
    sluttDato: '2020-03-01',
    stillingprosent: 99,

    veilederNavIdent: 'Z123456',
    veilederFornavn: 'Karoline',
    veilederEtternavn: 'Jakobsen',
    veilederTlf: '88888888',

    bedriftNavn: 'Sigvartsen Transport AS',
    bedriftNr: '12345678',

    deltakerFornavn: 'Frida',
    deltakerEtternavn: 'Vikanes',
    deltakerFnr: '00000000000',
    deltakerTlf: '44444444',

    arbeidsgiverFornavn: 'Otto',
    arbeidsgiverEtternavn: 'Olsen',
    arbeidsgiverTlf: '77777777',
    tiltakstype: 'ARBEIDSTRENING',

    maal: maalListe,
    oppgaver: oppgaveListe,
};

export default arbeidstreningAvtaleMock;
