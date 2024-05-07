import { j as e, A as P, G as L, S as r, B as t, V as B, f as N } from './Gjennomføres-DDe6u6XI.js';
import { K as M } from './KlarForOppstart-D5TZALq-.js';
import './index-CsdIBAqE.js';
const R = ({ avtale: n }) => {
    switch (n.statusSomEnum) {
        case 'ANNULLERT':
            return e.jsx(r, {
                header: 'Tiltaket er annullert',
                body: e.jsxs(t, {
                    size: 'small',
                    children: [
                        'Veileder har annullert tiltaket ',
                        N(n.annullertTidspunkt),
                        '. Årsak:',
                        ' ',
                        n.annullertGrunn,
                        '.',
                    ],
                }),
            });
        case 'AVBRUTT':
            return e.jsx(r, {
                header: 'Tiltaket er avbrutt',
                body: e.jsxs(t, {
                    size: 'small',
                    children: ['Veileder har avbrutt tiltaket. Årsak: ', n.avbruttGrunn, '.'],
                }),
            });
        case 'PÅBEGYNT':
            return e.jsx(r, {
                header: 'Utfylling av avtale påbegynt',
                body: e.jsx(t, {
                    size: 'small',
                    children:
                        'Innholdet i avtalen fylles ut av arbeidsgiveren og veilederen. Hvis du er uenig i innholdet eller har spørsmål til avtalen, må du kontakte NAV.',
                }),
            });
        case 'MANGLER_GODKJENNING':
            return e.jsx(r, {
                header: 'Vent til de andre har godkjent',
                body: e.jsxs(e.Fragment, {
                    children: [
                        e.jsx(t, {
                            size: 'small',
                            children:
                                'Du har signert taushetserklæring. Venter nå på godkjenning fra deltaker, arbeidsgiver og NAV.',
                        }),
                        e.jsx(B, { rem: 2 }),
                    ],
                }),
            });
        case 'KLAR_FOR_OPPSTART':
            return e.jsx(M, { avtaleInngått: n.avtaleInngått, startDato: n.gjeldendeInnhold.startDato });
        case 'GJENNOMFØRES':
            return e.jsx(L, { avtaleInngått: n.avtaleInngått, startDato: n.gjeldendeInnhold.startDato });
        case 'AVSLUTTET':
            return e.jsx(P, { startDato: n.gjeldendeInnhold.startDato, sluttDato: n.gjeldendeInnhold.sluttDato });
    }
    return null;
};
R.__docgenInfo = {
    description: '',
    methods: [],
    displayName: 'MentorAvtaleStatus',
    props: {
        avtale: {
            required: !0,
            tsType: {
                name: 'intersection',
                raw: `Pick<Avtale, 'statusSomEnum' | 'annullertTidspunkt' | 'avtaleInngått' | 'annullertGrunn' | 'avbruttGrunn'>
& { gjeldendeInnhold: Pick<Avtaleinnhold , 'startDato' | 'sluttDato'>}`,
                elements: [
                    {
                        name: 'Pick',
                        elements: [
                            {
                                name: 'intersection',
                                raw: `Annullering &
Avbrytelse &
Readonly<AvtaleMetadata> &
Avtaleparter &
Godkjenninger &
TilskuddsPerioder & { gjeldendeInnhold: Avtaleinnhold }`,
                                elements: [
                                    { name: 'Annullering' },
                                    { name: 'Avbrytelse' },
                                    {
                                        name: 'Readonly',
                                        elements: [{ name: 'AvtaleMetadata' }],
                                        raw: 'Readonly<AvtaleMetadata>',
                                    },
                                    { name: 'Avtaleparter' },
                                    { name: 'Godkjenninger' },
                                    { name: 'TilskuddsPerioder' },
                                    {
                                        name: 'signature',
                                        type: 'object',
                                        raw: '{ gjeldendeInnhold: Avtaleinnhold }',
                                        signature: {
                                            properties: [
                                                {
                                                    key: 'gjeldendeInnhold',
                                                    value: {
                                                        name: 'intersection',
                                                        raw: `{
    arbeidsgiverFornavn?: string;
    arbeidsgiverEtternavn?: string;
    arbeidsgiverTlf?: string;
    bedriftNavn: string;
    deltakerFornavn?: string;
    deltakerEtternavn?: string;
    deltakerTlf?: string;
    oppfolging?: string;
    stillingstittel?: string;
    arbeidsoppgaver?: string;
    stillingstype?: Stillingstype;
    stillingKonseptId?: number;
    stillingStyrk08?: number;
    tilrettelegging?: string;
    startDato?: string;
    sluttDato?: string;
    antallDagerPerUke?: number;
    veilederFornavn?: string;
    veilederEtternavn?: string;
    veilederTlf?: string;
    maal: Maal[];

    manedslonn?: number;
    feriepengesats?: number;
    arbeidsgiveravgift?: number;
    lonnstilskuddProsent?: number;
    stillingprosent?: number;
    feriepengerBelop?: number;
    otpSats?: number;
    otpBelop?: number;
    arbeidsgiveravgiftBelop?: number;
    sumLonnsutgifter?: number;
    sumLonnstilskudd?: number;
    manedslonn100pst?: number;
    datoForRedusertProsent?: string;
    sumLønnstilskuddRedusert?: number;
    refusjonKontaktperson?: RefusjonKontaktperson;

    enhetKostnadssted?: string;
    enhetsnavnKostnadssted?: string;

    arbeidsgiverKontonummer?: string;
    harFamilietilknytning?: boolean;
    familietilknytningForklaring?: string;

    mentorFornavn?: string;
    mentorTlf?: string;
    mentorEtternavn?: string;
    mentorOppgaver?: string;
    mentorAntallTimer?: number;
    mentorTimelonn?: number;
} & InkluderingsInnhold`,
                                                        elements: [
                                                            {
                                                                name: 'signature',
                                                                type: 'object',
                                                                raw: `{
    arbeidsgiverFornavn?: string;
    arbeidsgiverEtternavn?: string;
    arbeidsgiverTlf?: string;
    bedriftNavn: string;
    deltakerFornavn?: string;
    deltakerEtternavn?: string;
    deltakerTlf?: string;
    oppfolging?: string;
    stillingstittel?: string;
    arbeidsoppgaver?: string;
    stillingstype?: Stillingstype;
    stillingKonseptId?: number;
    stillingStyrk08?: number;
    tilrettelegging?: string;
    startDato?: string;
    sluttDato?: string;
    antallDagerPerUke?: number;
    veilederFornavn?: string;
    veilederEtternavn?: string;
    veilederTlf?: string;
    maal: Maal[];

    manedslonn?: number;
    feriepengesats?: number;
    arbeidsgiveravgift?: number;
    lonnstilskuddProsent?: number;
    stillingprosent?: number;
    feriepengerBelop?: number;
    otpSats?: number;
    otpBelop?: number;
    arbeidsgiveravgiftBelop?: number;
    sumLonnsutgifter?: number;
    sumLonnstilskudd?: number;
    manedslonn100pst?: number;
    datoForRedusertProsent?: string;
    sumLønnstilskuddRedusert?: number;
    refusjonKontaktperson?: RefusjonKontaktperson;

    enhetKostnadssted?: string;
    enhetsnavnKostnadssted?: string;

    arbeidsgiverKontonummer?: string;
    harFamilietilknytning?: boolean;
    familietilknytningForklaring?: string;

    mentorFornavn?: string;
    mentorTlf?: string;
    mentorEtternavn?: string;
    mentorOppgaver?: string;
    mentorAntallTimer?: number;
    mentorTimelonn?: number;
}`,
                                                                signature: {
                                                                    properties: [
                                                                        {
                                                                            key: 'arbeidsgiverFornavn',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'arbeidsgiverEtternavn',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'arbeidsgiverTlf',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'bedriftNavn',
                                                                            value: { name: 'string', required: !0 },
                                                                        },
                                                                        {
                                                                            key: 'deltakerFornavn',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'deltakerEtternavn',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'deltakerTlf',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'oppfolging',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'stillingstittel',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'arbeidsoppgaver',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'stillingstype',
                                                                            value: {
                                                                                name: 'union',
                                                                                raw: "'FAST' | 'MIDLERTIDIG'",
                                                                                elements: [
                                                                                    {
                                                                                        name: 'literal',
                                                                                        value: "'FAST'",
                                                                                    },
                                                                                    {
                                                                                        name: 'literal',
                                                                                        value: "'MIDLERTIDIG'",
                                                                                    },
                                                                                ],
                                                                                required: !1,
                                                                            },
                                                                        },
                                                                        {
                                                                            key: 'stillingKonseptId',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'stillingStyrk08',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'tilrettelegging',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'startDato',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'sluttDato',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'antallDagerPerUke',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'veilederFornavn',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'veilederEtternavn',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'veilederTlf',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'maal',
                                                                            value: {
                                                                                name: 'Array',
                                                                                elements: [{ name: 'Maal' }],
                                                                                raw: 'Maal[]',
                                                                                required: !0,
                                                                            },
                                                                        },
                                                                        {
                                                                            key: 'manedslonn',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'feriepengesats',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'arbeidsgiveravgift',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'lonnstilskuddProsent',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'stillingprosent',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'feriepengerBelop',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'otpSats',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'otpBelop',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'arbeidsgiveravgiftBelop',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'sumLonnsutgifter',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'sumLonnstilskudd',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'manedslonn100pst',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'datoForRedusertProsent',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'sumLønnstilskuddRedusert',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'refusjonKontaktperson',
                                                                            value: {
                                                                                name: 'RefusjonKontaktperson',
                                                                                required: !1,
                                                                            },
                                                                        },
                                                                        {
                                                                            key: 'enhetKostnadssted',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'enhetsnavnKostnadssted',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'arbeidsgiverKontonummer',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'harFamilietilknytning',
                                                                            value: { name: 'boolean', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'familietilknytningForklaring',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'mentorFornavn',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'mentorTlf',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'mentorEtternavn',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'mentorOppgaver',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'mentorAntallTimer',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'mentorTimelonn',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                    ],
                                                                },
                                                            },
                                                            { name: 'InkluderingsInnhold' },
                                                        ],
                                                        required: !0,
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                            {
                                name: 'union',
                                raw: "'statusSomEnum' | 'annullertTidspunkt' | 'avtaleInngått' | 'annullertGrunn' | 'avbruttGrunn'",
                                elements: [
                                    { name: 'literal', value: "'statusSomEnum'" },
                                    { name: 'literal', value: "'annullertTidspunkt'" },
                                    { name: 'literal', value: "'avtaleInngått'" },
                                    { name: 'literal', value: "'annullertGrunn'" },
                                    { name: 'literal', value: "'avbruttGrunn'" },
                                ],
                            },
                        ],
                        raw: "Pick<Avtale, 'statusSomEnum' | 'annullertTidspunkt' | 'avtaleInngått' | 'annullertGrunn' | 'avbruttGrunn'>",
                    },
                    {
                        name: 'signature',
                        type: 'object',
                        raw: "{ gjeldendeInnhold: Pick<Avtaleinnhold , 'startDato' | 'sluttDato'>}",
                        signature: {
                            properties: [
                                {
                                    key: 'gjeldendeInnhold',
                                    value: {
                                        name: 'Pick',
                                        elements: [
                                            {
                                                name: 'intersection',
                                                raw: `{
    arbeidsgiverFornavn?: string;
    arbeidsgiverEtternavn?: string;
    arbeidsgiverTlf?: string;
    bedriftNavn: string;
    deltakerFornavn?: string;
    deltakerEtternavn?: string;
    deltakerTlf?: string;
    oppfolging?: string;
    stillingstittel?: string;
    arbeidsoppgaver?: string;
    stillingstype?: Stillingstype;
    stillingKonseptId?: number;
    stillingStyrk08?: number;
    tilrettelegging?: string;
    startDato?: string;
    sluttDato?: string;
    antallDagerPerUke?: number;
    veilederFornavn?: string;
    veilederEtternavn?: string;
    veilederTlf?: string;
    maal: Maal[];

    manedslonn?: number;
    feriepengesats?: number;
    arbeidsgiveravgift?: number;
    lonnstilskuddProsent?: number;
    stillingprosent?: number;
    feriepengerBelop?: number;
    otpSats?: number;
    otpBelop?: number;
    arbeidsgiveravgiftBelop?: number;
    sumLonnsutgifter?: number;
    sumLonnstilskudd?: number;
    manedslonn100pst?: number;
    datoForRedusertProsent?: string;
    sumLønnstilskuddRedusert?: number;
    refusjonKontaktperson?: RefusjonKontaktperson;

    enhetKostnadssted?: string;
    enhetsnavnKostnadssted?: string;

    arbeidsgiverKontonummer?: string;
    harFamilietilknytning?: boolean;
    familietilknytningForklaring?: string;

    mentorFornavn?: string;
    mentorTlf?: string;
    mentorEtternavn?: string;
    mentorOppgaver?: string;
    mentorAntallTimer?: number;
    mentorTimelonn?: number;
} & InkluderingsInnhold`,
                                                elements: [
                                                    {
                                                        name: 'signature',
                                                        type: 'object',
                                                        raw: `{
    arbeidsgiverFornavn?: string;
    arbeidsgiverEtternavn?: string;
    arbeidsgiverTlf?: string;
    bedriftNavn: string;
    deltakerFornavn?: string;
    deltakerEtternavn?: string;
    deltakerTlf?: string;
    oppfolging?: string;
    stillingstittel?: string;
    arbeidsoppgaver?: string;
    stillingstype?: Stillingstype;
    stillingKonseptId?: number;
    stillingStyrk08?: number;
    tilrettelegging?: string;
    startDato?: string;
    sluttDato?: string;
    antallDagerPerUke?: number;
    veilederFornavn?: string;
    veilederEtternavn?: string;
    veilederTlf?: string;
    maal: Maal[];

    manedslonn?: number;
    feriepengesats?: number;
    arbeidsgiveravgift?: number;
    lonnstilskuddProsent?: number;
    stillingprosent?: number;
    feriepengerBelop?: number;
    otpSats?: number;
    otpBelop?: number;
    arbeidsgiveravgiftBelop?: number;
    sumLonnsutgifter?: number;
    sumLonnstilskudd?: number;
    manedslonn100pst?: number;
    datoForRedusertProsent?: string;
    sumLønnstilskuddRedusert?: number;
    refusjonKontaktperson?: RefusjonKontaktperson;

    enhetKostnadssted?: string;
    enhetsnavnKostnadssted?: string;

    arbeidsgiverKontonummer?: string;
    harFamilietilknytning?: boolean;
    familietilknytningForklaring?: string;

    mentorFornavn?: string;
    mentorTlf?: string;
    mentorEtternavn?: string;
    mentorOppgaver?: string;
    mentorAntallTimer?: number;
    mentorTimelonn?: number;
}`,
                                                        signature: {
                                                            properties: [
                                                                {
                                                                    key: 'arbeidsgiverFornavn',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'arbeidsgiverEtternavn',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'arbeidsgiverTlf',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'bedriftNavn',
                                                                    value: { name: 'string', required: !0 },
                                                                },
                                                                {
                                                                    key: 'deltakerFornavn',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'deltakerEtternavn',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'deltakerTlf',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'oppfolging',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'stillingstittel',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'arbeidsoppgaver',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'stillingstype',
                                                                    value: {
                                                                        name: 'union',
                                                                        raw: "'FAST' | 'MIDLERTIDIG'",
                                                                        elements: [
                                                                            { name: 'literal', value: "'FAST'" },
                                                                            { name: 'literal', value: "'MIDLERTIDIG'" },
                                                                        ],
                                                                        required: !1,
                                                                    },
                                                                },
                                                                {
                                                                    key: 'stillingKonseptId',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'stillingStyrk08',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'tilrettelegging',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'startDato',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'sluttDato',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'antallDagerPerUke',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'veilederFornavn',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'veilederEtternavn',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'veilederTlf',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'maal',
                                                                    value: {
                                                                        name: 'Array',
                                                                        elements: [{ name: 'Maal' }],
                                                                        raw: 'Maal[]',
                                                                        required: !0,
                                                                    },
                                                                },
                                                                {
                                                                    key: 'manedslonn',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'feriepengesats',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'arbeidsgiveravgift',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'lonnstilskuddProsent',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'stillingprosent',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'feriepengerBelop',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'otpSats',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'otpBelop',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'arbeidsgiveravgiftBelop',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'sumLonnsutgifter',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'sumLonnstilskudd',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'manedslonn100pst',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'datoForRedusertProsent',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'sumLønnstilskuddRedusert',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'refusjonKontaktperson',
                                                                    value: {
                                                                        name: 'RefusjonKontaktperson',
                                                                        required: !1,
                                                                    },
                                                                },
                                                                {
                                                                    key: 'enhetKostnadssted',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'enhetsnavnKostnadssted',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'arbeidsgiverKontonummer',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'harFamilietilknytning',
                                                                    value: { name: 'boolean', required: !1 },
                                                                },
                                                                {
                                                                    key: 'familietilknytningForklaring',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'mentorFornavn',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'mentorTlf',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'mentorEtternavn',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'mentorOppgaver',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'mentorAntallTimer',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'mentorTimelonn',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                            ],
                                                        },
                                                    },
                                                    { name: 'InkluderingsInnhold' },
                                                ],
                                                required: !0,
                                            },
                                            {
                                                name: 'union',
                                                raw: "'startDato' | 'sluttDato'",
                                                elements: [
                                                    { name: 'literal', value: "'startDato'" },
                                                    { name: 'literal', value: "'sluttDato'" },
                                                ],
                                            },
                                        ],
                                        raw: "Pick<Avtaleinnhold , 'startDato' | 'sluttDato'>",
                                        required: !0,
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
            description: '',
        },
    },
};
const H = { title: 'Tiltaksgjennomforing/Statuser/Mentor', component: R, parameters: { layout: 'fullscreen' } },
    O = {
        statusSomEnum: 'ANNULLERT',
        annullertTidspunkt: '2021-08-01',
        avtaleInngått: '2021-08-01',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    a = { name: 'Annullert', args: { avtale: O } },
    x = {
        statusSomEnum: 'AVBRUTT',
        annullertTidspunkt: '2021-08-01',
        avtaleInngått: '2021-08-01',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    s = { name: 'Avbrutt', args: { avtale: x } },
    w = {
        statusSomEnum: 'PÅBEGYNT',
        annullertTidspunkt: '2021-08-01',
        avtaleInngått: '2021-08-01',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    l = { name: 'Påbegynt', args: { avtale: w } },
    V = {
        statusSomEnum: 'MANGLER_GODKJENNING',
        annullertTidspunkt: '',
        avtaleInngått: '',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    i = {
        name: 'Mangler Godkjenning Arbeidisgiver har godkjent men manger godkjenning av Deltakeren og Veileder',
        args: { avtale: V },
    },
    U = {
        statusSomEnum: 'KLAR_FOR_OPPSTART',
        annullertTidspunkt: '',
        avtaleInngått: '2021-08-01',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    u = { name: 'Klar For Oppstart', args: { avtale: U } },
    _ = {
        statusSomEnum: 'GJENNOMFØRES',
        annullertTidspunkt: '',
        avtaleInngått: '2021-08-01',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    o = { name: 'Gjennomføres', args: { avtale: _ } },
    z = {
        statusSomEnum: 'AVSLUTTET',
        annullertTidspunkt: '',
        avtaleInngått: '',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    m = { name: 'Avsluttet', args: { avtale: z } };
var g, d, v;
a.parameters = {
    ...a.parameters,
    docs: {
        ...((g = a.parameters) == null ? void 0 : g.docs),
        source: {
            originalSource: `{
  name: 'Annullert',
  args: {
    avtale: annullert
  }
}`,
            ...((v = (d = a.parameters) == null ? void 0 : d.docs) == null ? void 0 : v.source),
        },
    },
};
var k, b, p;
s.parameters = {
    ...s.parameters,
    docs: {
        ...((k = s.parameters) == null ? void 0 : k.docs),
        source: {
            originalSource: `{
  name: 'Avbrutt',
  args: {
    avtale: avbrutt
  }
}`,
            ...((p = (b = s.parameters) == null ? void 0 : b.docs) == null ? void 0 : p.source),
        },
    },
};
var f, y, q;
l.parameters = {
    ...l.parameters,
    docs: {
        ...((f = l.parameters) == null ? void 0 : f.docs),
        source: {
            originalSource: `{
  name: 'Påbegynt',
  args: {
    avtale: påbegynt
  }
}`,
            ...((q = (y = l.parameters) == null ? void 0 : y.docs) == null ? void 0 : q.source),
        },
    },
};
var c, T, j;
i.parameters = {
    ...i.parameters,
    docs: {
        ...((c = i.parameters) == null ? void 0 : c.docs),
        source: {
            originalSource: `{
  name: 'Mangler Godkjenning Arbeidisgiver har godkjent men manger godkjenning av Deltakeren og Veileder',
  args: {
    avtale: manglerGodkjenning
  }
}`,
            ...((j = (T = i.parameters) == null ? void 0 : T.docs) == null ? void 0 : j.source),
        },
    },
};
var h, D, I;
u.parameters = {
    ...u.parameters,
    docs: {
        ...((h = u.parameters) == null ? void 0 : h.docs),
        source: {
            originalSource: `{
  name: 'Klar For Oppstart',
  args: {
    avtale: klarForOppstart
  }
}`,
            ...((I = (D = u.parameters) == null ? void 0 : D.docs) == null ? void 0 : I.source),
        },
    },
};
var A, F, E;
o.parameters = {
    ...o.parameters,
    docs: {
        ...((A = o.parameters) == null ? void 0 : A.docs),
        source: {
            originalSource: `{
  name: 'Gjennomføres',
  args: {
    avtale: gjennomføres
  }
}`,
            ...((E = (F = o.parameters) == null ? void 0 : F.docs) == null ? void 0 : E.source),
        },
    },
};
var G, S, K;
m.parameters = {
    ...m.parameters,
    docs: {
        ...((G = m.parameters) == null ? void 0 : G.docs),
        source: {
            originalSource: `{
  name: 'Avsluttet',
  args: {
    avtale: avsluttet
  }
}`,
            ...((K = (S = m.parameters) == null ? void 0 : S.docs) == null ? void 0 : K.source),
        },
    },
};
const C = ['Annullert', 'Avbrutt', 'Påbegynt', 'ManglerGodkjenning', 'KlarForOppstart', 'Gjennomføres', 'Avsluttet'];
export {
    a as Annullert,
    s as Avbrutt,
    m as Avsluttet,
    o as Gjennomføres,
    u as KlarForOppstart,
    i as ManglerGodkjenning,
    l as Påbegynt,
    C as __namedExportsOrder,
    H as default,
};
