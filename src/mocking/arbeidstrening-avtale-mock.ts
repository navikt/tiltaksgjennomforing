import { Avtale, Maal, TilskuddsPeriode } from '@/types/avtale';

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
        beløp: 0,
        id: '',
        startDato: '',
        sluttDato: '',
    },
];

const arbeidstreningAvtaleMock: Avtale = {
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
    kanGjenopprettes: false,
    versjoner: [],
    avbrutt: false,
    godkjentPaVegneAv: false,

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
};

export default arbeidstreningAvtaleMock;
