import { Avslagsårsaker, Avtale, Maal, TilskuddsPeriode } from '@/types/avtale';

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

const tilskuddsPeriode: TilskuddsPeriode[] = [
    {
        løpenummer: 1,
        beløp: 0,
        id: '',
        startDato: '',
        sluttDato: '',
        status: 'UBEHANDLET',
        godkjentTidspunkt: '',
        avslagsårsaker: new Set<Avslagsårsaker>(),
        lonnstilskuddProsent: 60,
        kanBesluttesFom: '2021-01-01',
        aktiv: true,
    },
];

const arbeidstreningAvtaleMock: Avtale = {
    id: '0',
    opprettetTidspunkt: '2020-01-01T00:00:00.000000',
    sistEndret: '2020-01-01T00:00:00.000000',
    godkjentAvDeltaker: undefined,
    godkjentAvArbeidsgiver: undefined,
    godkjentAvVeileder: undefined,
    erLaast: false,
    status: 'PÅBEGYNT',
    kanAvbrytes: true,
    kanLåsesOpp: false,
    kanGjenopprettes: false,
    versjoner: [],
    avbrutt: false,
    godkjentPaVegneAv: false,
    erAnnullertEllerAvbrutt: false,

    godkjentPaVegneGrunn: undefined,

    oppfolging: 'Bruker og AG skal følges opp',
    tilrettelegging: 'AG skal tilrettelegge',

    startDato: '2020-02-01',
    sluttDato: '2020-03-01',
    stillingprosent: 99,

    tilskuddPeriode: tilskuddsPeriode,

    veilederNavIdent: 'Z123456',
    beslutterNavIdent: 'Z234512',
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

    avbruttDato: '',
    avbruttGrunn: '',
    erUfordelt: false,
    statusSomEnum: 'GJENNOMFØRES',

    felterSomIkkeErFyltUt: [],
    avtaleNr: 1,
};

export default arbeidstreningAvtaleMock;
