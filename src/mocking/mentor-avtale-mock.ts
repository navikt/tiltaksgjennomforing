import { Formidlingsgruppe } from '@/AvtaleSide/steg/BeregningTilskudd/Formidlingsgruppe';
import { Kvalifiseringsgruppe } from '@/AvtaleSide/steg/BeregningTilskudd/Kvalifiseringsgruppe';
import { Avtale } from '@/types/avtale';
import { Avtaleinnhold } from '@/types/avtale';

const mentorAvtaleMock: Avtale | Avtaleinnhold = {
    id: '6565e74d-66f3-44a1-8a3c-91fae6b450d3',
    opprettetTidspunkt: '',
    sistEndret: '',

    godkjentAvDeltaker: '',
    godkjentAvArbeidsgiver: '',
    godkjentAvVeileder: '',
    status: 'PÅBEGYNT',
    avbrutt: false,
    godkjentPaVegneAv: false,

    godkjentPaVegneGrunn: {
        ikkeBankId: false,
        reservert: false,
        digitalKompetanse: false,
    },

    bedriftNr: '12345678',
    deltakerFnr: '00000000000',
    gjeldendeInnhold: {
        oppfolging: 'Bruker og AG skal følges opp.',
        tilrettelegging: 'AG skal tilrettelegge.',

        startDato: '89',
        sluttDato: '79',
        stillingprosent: 99,
        veilederFornavn: 'Nave',
        veilederEtternavn: 'Naversen',
        veilederTlf: '88888888',

        bedriftNavn: 'Arbeids AS',

        deltakerFornavn: 'Deltakeren',
        deltakerEtternavn: 'Deltakerensen',
        deltakerTlf: '54444444',

        arbeidsgiverFornavn: 'Arbeidsgivers',
        arbeidsgiverEtternavn: 'Arbeidsgiverssen',
        arbeidsgiverTlf: '87777777',
        maal: [],
    },

    tilskuddPeriode: [],

    veilederNavIdent: 'Z123456',
    beslutterNavIdent: 'Z321456',
    tiltakstype: 'MIDLERTIDIG_LONNSTILSKUDD',

    mentorFornavn: 'Mentoren',
    mentorEtternavn: 'Mentorsen',
    mentorOppgaver: 'Mentorgreier',
    mentorAntallTimer: 20,
    mentorTimelonn: 200,

    avbruttDato: '',
    avbruttGrunn: '',
    erUfordelt: false,
    statusSomEnum: 'GJENNOMFØRES',

    maal: [],

    kvalifiseringsgruppe: Kvalifiseringsgruppe.SPESIELT_TILPASSET_INNSATS,
    formidlingsgruppe: Formidlingsgruppe.ARBEIDSSOKER,

    felterSomIkkeErFyltUt: [],
    avtaleNr: 1,
    erAnnullertEllerAvbrutt: false,

    godkjentForEtterregistrering: false,
};

export default mentorAvtaleMock;
