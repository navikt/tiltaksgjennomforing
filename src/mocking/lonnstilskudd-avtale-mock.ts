import { Formidlingsgruppe } from '@/AvtaleSide/steg/BeregningTilskudd/Formidlingsgruppe';
import { Kvalifiseringsgruppe } from '@/AvtaleSide/steg/BeregningTilskudd/Kvalifiseringsgruppe';
import { Avtale, Avtaleopphav } from '@/types/avtale';

const lonnstilskuddAvtaleMock: Avtale = {
    id: '1',
    opprettetTidspunkt: '2020-01-02T00:00:00.000000',
    sistEndret: '2020-01-03T00:00:00.000000',

    godkjentAvDeltaker: '',
    godkjentAvArbeidsgiver: '',
    godkjentAvVeileder: '',
    godkjentPaVegneAv: false,

    kvalifiseringsgruppe: Kvalifiseringsgruppe.SPESIELT_TILPASSET_INNSATS,
    formidlingsgruppe: Formidlingsgruppe.ARBEIDSSOKER,

    godkjentPaVegneGrunn: {
        ikkeBankId: false,
        reservert: false,
        digitalKompetanse: false,
        arenaMigreringDeltaker: false,
    },

    deltakerFnr: '00000000000',
    mentorFnr: '00000000000',
    gjeldendeInnhold: {
        oppfolging: 'Bruker og AG skal følges opp.',
        tilrettelegging: 'AG skal tilrettelegge.',
        startDato: '2020-04-01',
        sluttDato: '2020-05-01',
        stillingprosent: 99,
        bedriftNavn: 'Arna Snekker AS',
        deltakerFornavn: 'Håkon',
        deltakerEtternavn: 'Johansen',
        deltakerTlf: '54444444',

        arbeidsgiverFornavn: 'Ingunn',
        arbeidsgiverEtternavn: 'Thomassen',
        arbeidsgiverTlf: '87777777',

        arbeidsgiveravgift: 20,
        feriepengesats: 20,
        lonnstilskuddProsent: 60,
        manedslonn: 10000,
        arbeidsgiverKontonummer: '123',
        arbeidsoppgaver: '',
        stillingstittel: '',
        harFamilietilknytning: false,
        feriepengerBelop: 0,
        otpSats: 0.02,
        otpBelop: 0,
        arbeidsgiveravgiftBelop: 0,
        sumLonnsutgifter: 0,
        sumLonnstilskudd: 0,
        veilederFornavn: 'Kåre',
        veilederEtternavn: 'Sandøy',
        veilederTlf: '88888888',
        maal: [],
        inkluderingstilskuddsutgift: [],
        inkluderingstilskuddBegrunnelse: '',
        inkluderingstilskuddTotalBeløp: 0,
        inkluderingstilskuddSats: 149_100,
        innholdType: 'INNGÅ',
    },

    tilskuddPeriode: [],

    veilederNavIdent: 'Z123456',
    beslutterNavIdent: 'Z321456',

    bedriftNr: '12345678',

    tiltakstype: 'MIDLERTIDIG_LONNSTILSKUDD',
    erUfordelt: false,
    status: 'GJENNOMFØRES',

    felterSomIkkeErFyltUt: [],
    avtaleNr: 1,
    godkjentForEtterregistrering: false,
    erAvtaleInngått: false,
    erRyddeAvtale: false,
    opphav: 'VEILEDER',
    feilregistrert: false,
    erOpprettetEllerEndretAvArena: false,
};

export default lonnstilskuddAvtaleMock;
