import { Formidlingsgruppe } from '@/AvtaleSide/steg/BeregningTilskudd/Formidlingsgruppe';
import { Kvalifiseringsgruppe } from '@/AvtaleSide/steg/BeregningTilskudd/Kvalifiseringsgruppe';
import { Returårsaker, Avtale, Maal, TilskuddsPeriode } from '@/types/avtale';

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
        avslagsårsaker: new Set<Returårsaker>(),
        lonnstilskuddProsent: 60,
        kanBesluttesFom: '2021-01-01',
        kanBehandles: true,
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
    erGodkjentTaushetserklæringAvMentor: undefined,
    godkjentPaVegneAv: false,

    godkjentPaVegneGrunn: undefined,

    bedriftNr: '12345678',
    deltakerFnr: '00000000000',
    mentorFnr: '00000000000',
    gjeldendeInnhold: {
        oppfolging: 'Bruker og AG skal følges opp',
        tilrettelegging: 'AG skal tilrettelegge',
        veilederFornavn: 'Karoline',
        veilederEtternavn: 'Jakobsen',
        veilederTlf: '88888888',

        bedriftNavn: 'Sigvartsen Transport AS',

        deltakerFornavn: 'Frida',
        deltakerEtternavn: 'Vikanes',
        deltakerTlf: '44444444',

        arbeidsgiverFornavn: 'Otto',
        arbeidsgiverEtternavn: 'Olsen',
        arbeidsgiverTlf: '77777777',

        maal: maalListe,

        startDato: '2020-02-01',
        sluttDato: '2020-03-01',
        stillingprosent: 99,
        inkluderingstilskuddsutgift: [],
        inkluderingstilskuddBegrunnelse: '',
        inkluderingstilskuddTotalBeløp: 0,
        inkluderingstilskuddSats: 149_100,
        innholdType: 'INNGÅ',
    },

    tilskuddPeriode: tilskuddsPeriode,

    veilederNavIdent: 'Z123456',
    beslutterNavIdent: 'Z234512',

    tiltakstype: 'ARBEIDSTRENING',

    erUfordelt: false,
    status: 'GJENNOMFØRES',

    felterSomIkkeErFyltUt: [],
    avtaleNr: 1,

    enhetKostnadssted: undefined,
    enhetsnavnKostnadssted: undefined,

    kvalifiseringsgruppe: Kvalifiseringsgruppe.SPESIELT_TILPASSET_INNSATS,
    formidlingsgruppe: Formidlingsgruppe.ARBEIDSSOKER,

    godkjentForEtterregistrering: false,
    erAvtaleInngått: false,
    erRyddeAvtale: false,
    opphav: 'VEILEDER',
    feilregistrert: false,
    erOpprettetEllerEndretAvArena: false,
};

export default arbeidstreningAvtaleMock;
