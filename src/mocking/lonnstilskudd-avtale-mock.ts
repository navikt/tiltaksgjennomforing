import { Formidlingsgruppe } from '@/AvtaleSide/steg/BeregningTilskudd/Formidlingsgruppe';
import { Kvalifiseringsgruppe } from '@/AvtaleSide/steg/BeregningTilskudd/Kvalifiseringsgruppe';
import { Avtale } from '@/types/avtale';
import { Avtaleinnhold } from './../types/avtale';

const lonnstilskuddAvtaleMock: Avtale | Avtaleinnhold = {
    id: '1',
    opprettetTidspunkt: '2020-01-02T00:00:00.000000',
    sistEndret: '2020-01-03T00:00:00.000000',

    godkjentAvDeltaker: '',
    godkjentAvArbeidsgiver: '',
    godkjentAvVeileder: '',
    status: 'PÅBEGYNT',
    avbrutt: false,
    godkjentPaVegneAv: false,
    erAnnullertEllerAvbrutt: false,

    kvalifiseringsgruppe: Kvalifiseringsgruppe.SPESIELT_TILPASSET_INNSATS,
    formidlingsgruppe: Formidlingsgruppe.ARBEIDSSOKER,

    godkjentPaVegneGrunn: {
        ikkeBankId: false,
        reservert: false,
        digitalKompetanse: false,
    },

    oppfolging: 'Bruker og AG skal følges opp.',
    tilrettelegging: 'AG skal tilrettelegge.',

    startDato: '2020-04-01',
    sluttDato: '2020-05-01',
    stillingprosent: 99,

    tilskuddPeriode: [],

    veilederNavIdent: 'Z123456',
    beslutterNavIdent: 'Z321456',
    veilederFornavn: 'Kåre',
    veilederEtternavn: 'Sandøy',
    veilederTlf: '88888888',

    bedriftNavn: 'Arna Snekker AS',
    bedriftNr: '12345678',

    deltakerFornavn: 'Håkon',
    deltakerEtternavn: 'Johansen',
    deltakerFnr: '00000000000',
    deltakerTlf: '54444444',

    arbeidsgiverFornavn: 'Ingunn',
    arbeidsgiverEtternavn: 'Thomassen',
    arbeidsgiverTlf: '87777777',
    tiltakstype: 'MIDLERTIDIG_LONNSTILSKUDD',

    arbeidsgiveravgift: 20,
    feriepengesats: 20,
    lonnstilskuddProsent: 60,
    manedslonn: 10000,
    arbeidsgiverKontonummer: '123',
    arbeidsoppgaver: '',
    stillingstittel: '',
    harFamilietilknytning: false,
    avbruttDato: '',
    avbruttGrunn: '',
    feriepengerBelop: 0,
    otpSats: 0.02,
    otpBelop: 0,
    arbeidsgiveravgiftBelop: 0,
    sumLonnsutgifter: 0,
    sumLonnstilskudd: 0,
    erUfordelt: false,
    statusSomEnum: 'GJENNOMFØRES',

    maal: [],

    felterSomIkkeErFyltUt: [],
    avtaleNr: 1,

    godkjentForEtterregistrering: false,
};

export default lonnstilskuddAvtaleMock;
