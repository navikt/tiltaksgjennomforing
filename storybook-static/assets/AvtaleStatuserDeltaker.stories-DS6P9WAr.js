import { j as e, A as x, G as O, S as r, B as t, V as m, f as w } from './Gjennomføres-DDe6u6XI.js';
import { K as U } from './KlarForOppstart-D5TZALq-.js';
import './index-CsdIBAqE.js';
const M = ({ avtale: n }) => {
    switch (n.statusSomEnum) {
        case 'ANNULLERT':
            return e.jsx(r, {
                header: 'Tiltaket er annullert',
                body: e.jsxs(t, {
                    size: 'small',
                    children: [
                        'Veileder har annullert tiltaket ',
                        w(n.annullertTidspunkt),
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
                        'Innholdet i avtalen fylles ut av arbeidsgiveren og veilederen. Hvis du er uenig i innholdet eller har spørsmål til avtalen, må du kontakte veilederen din via aktivitetsplanen før du godkjenner. Du kan godkjenne avtalen når alt er fylt ut.',
                }),
            });
        case 'MANGLER_GODKJENNING':
            return n.godkjentAvDeltaker
                ? e.jsx(r, {
                      header: 'Vent til de andre har godkjent',
                      body: e.jsxs(e.Fragment, {
                          children: [
                              e.jsx(t, {
                                  size: 'small',
                                  children: 'Du har godkjent avtalen. Venter nå på godkjenning fra NAV.',
                              }),
                              e.jsx(m, { rem: 2 }),
                          ],
                      }),
                  })
                : e.jsx(r, {
                      header: 'Du kan godkjenne',
                      body: e.jsxs(e.Fragment, {
                          children: [
                              e.jsx(t, {
                                  size: 'small',
                                  children:
                                      'Før du godkjenner avtalen må du sjekke at alt er i orden og innholdet er riktig.',
                              }),
                              e.jsx(m, { rem: 2 }),
                          ],
                      }),
                  });
        case 'KLAR_FOR_OPPSTART':
            return e.jsx(U, { avtaleInngått: n.avtaleInngått, startDato: n.gjeldendeInnhold.startDato });
        case 'GJENNOMFØRES':
            return e.jsx(O, { avtaleInngått: n.avtaleInngått, startDato: n.gjeldendeInnhold.startDato });
        case 'AVSLUTTET':
            return e.jsx(x, { startDato: n.gjeldendeInnhold.startDato, sluttDato: n.gjeldendeInnhold.sluttDato });
    }
    return null;
};
M.__docgenInfo = {
    description: '',
    methods: [],
    displayName: 'DeltakerAvtaleStatus',
    props: {
        avtale: {
            required: !0,
            tsType: {
                name: 'intersection',
                raw: `Pick<Avtale, 'statusSomEnum' | 'annullertTidspunkt' | 'godkjentAvDeltaker' | 'godkjentAvDeltaker' | 'avtaleInngått' | 'annullertGrunn' | 'avbruttGrunn'>
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
                                raw: "'statusSomEnum' | 'annullertTidspunkt' | 'godkjentAvDeltaker' | 'godkjentAvDeltaker' | 'avtaleInngått' | 'annullertGrunn' | 'avbruttGrunn'",
                                elements: [
                                    { name: 'literal', value: "'statusSomEnum'" },
                                    { name: 'literal', value: "'annullertTidspunkt'" },
                                    { name: 'literal', value: "'godkjentAvDeltaker'" },
                                    { name: 'literal', value: "'godkjentAvDeltaker'" },
                                    { name: 'literal', value: "'avtaleInngått'" },
                                    { name: 'literal', value: "'annullertGrunn'" },
                                    { name: 'literal', value: "'avbruttGrunn'" },
                                ],
                            },
                        ],
                        raw: "Pick<Avtale, 'statusSomEnum' | 'annullertTidspunkt' | 'godkjentAvDeltaker' | 'godkjentAvDeltaker' | 'avtaleInngått' | 'annullertGrunn' | 'avbruttGrunn'>",
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
const Z = { title: 'Tiltaksgjennomforing/Statuser/Deltaker', component: M, parameters: { layout: 'fullscreen' } },
    V = {
        statusSomEnum: 'ANNULLERT',
        annullertTidspunkt: '2021-08-01',
        godkjentAvDeltaker: '20-08-01',
        avtaleInngått: '2021-08-01',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    a = { name: 'Annullert', args: { avtale: V } },
    _ = {
        statusSomEnum: 'AVBRUTT',
        annullertTidspunkt: '2021-08-01',
        godkjentAvDeltaker: '20-08-01',
        avtaleInngått: '2021-08-01',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    s = { name: 'Avbrutt', args: { avtale: _ } },
    H = {
        statusSomEnum: 'PÅBEGYNT',
        annullertTidspunkt: '2021-08-01',
        godkjentAvDeltaker: '20-08-01',
        avtaleInngått: '2021-08-01',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    l = { name: 'Påbegynt', args: { avtale: H } },
    z = {
        statusSomEnum: 'MANGLER_GODKJENNING',
        annullertTidspunkt: '',
        godkjentAvDeltaker: '2024-05-03T12:26:24.40876',
        avtaleInngått: '',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    i = {
        name: 'Mangler Godkjenning Deltaker har godkjent men manger godkjenning av Arbeidsgiver og Veileder',
        args: { avtale: z },
    },
    J = {
        statusSomEnum: 'MANGLER_GODKJENNING',
        annullertTidspunkt: '',
        godkjentAvDeltaker: '',
        avtaleInngått: '',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    u = { name: ' Mangler Godkjenning Deltaker har ikke godkjent avtalen enda', args: { avtale: J } },
    Y = {
        statusSomEnum: 'KLAR_FOR_OPPSTART',
        annullertTidspunkt: '',
        godkjentAvDeltaker: '',
        avtaleInngått: '2021-08-01',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    o = { name: 'Klar For Oppstart', args: { avtale: Y } },
    $ = {
        statusSomEnum: 'GJENNOMFØRES',
        annullertTidspunkt: '',
        godkjentAvDeltaker: '',
        avtaleInngått: '2021-08-01',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    d = { name: 'Gjennomføres', args: { avtale: $ } },
    C = {
        statusSomEnum: 'AVSLUTTET',
        annullertTidspunkt: '',
        godkjentAvDeltaker: '',
        avtaleInngått: '',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    g = { name: 'Avsluttet', args: { avtale: C } };
var v, k, b;
a.parameters = {
    ...a.parameters,
    docs: {
        ...((v = a.parameters) == null ? void 0 : v.docs),
        source: {
            originalSource: `{
  name: 'Annullert',
  args: {
    avtale: annullert
  }
}`,
            ...((b = (k = a.parameters) == null ? void 0 : k.docs) == null ? void 0 : b.source),
        },
    },
};
var p, f, y;
s.parameters = {
    ...s.parameters,
    docs: {
        ...((p = s.parameters) == null ? void 0 : p.docs),
        source: {
            originalSource: `{
  name: 'Avbrutt',
  args: {
    avtale: avbrutt
  }
}`,
            ...((y = (f = s.parameters) == null ? void 0 : f.docs) == null ? void 0 : y.source),
        },
    },
};
var j, c, D;
l.parameters = {
    ...l.parameters,
    docs: {
        ...((j = l.parameters) == null ? void 0 : j.docs),
        source: {
            originalSource: `{
  name: 'Påbegynt',
  args: {
    avtale: påbegynt
  }
}`,
            ...((D = (c = l.parameters) == null ? void 0 : c.docs) == null ? void 0 : D.source),
        },
    },
};
var q, T, A;
i.parameters = {
    ...i.parameters,
    docs: {
        ...((q = i.parameters) == null ? void 0 : q.docs),
        source: {
            originalSource: `{
  name: 'Mangler Godkjenning Deltaker har godkjent men manger godkjenning av Arbeidsgiver og Veileder',
  args: {
    avtale: manglerGodkjenningDeltakerHarGodkjent
  }
}`,
            ...((A = (T = i.parameters) == null ? void 0 : T.docs) == null ? void 0 : A.source),
        },
    },
};
var h, G, I;
u.parameters = {
    ...u.parameters,
    docs: {
        ...((h = u.parameters) == null ? void 0 : h.docs),
        source: {
            originalSource: `{
  name: ' Mangler Godkjenning Deltaker har ikke godkjent avtalen enda',
  args: {
    avtale: manglerGodkjenningDeltakerHarIkkeGodkjent
  }
}`,
            ...((I = (G = u.parameters) == null ? void 0 : G.docs) == null ? void 0 : I.source),
        },
    },
};
var F, E, S;
o.parameters = {
    ...o.parameters,
    docs: {
        ...((F = o.parameters) == null ? void 0 : F.docs),
        source: {
            originalSource: `{
  name: 'Klar For Oppstart',
  args: {
    avtale: klarForOppstart
  }
}`,
            ...((S = (E = o.parameters) == null ? void 0 : E.docs) == null ? void 0 : S.source),
        },
    },
};
var K, R, P;
d.parameters = {
    ...d.parameters,
    docs: {
        ...((K = d.parameters) == null ? void 0 : K.docs),
        source: {
            originalSource: `{
  name: 'Gjennomføres',
  args: {
    avtale: gjennomføres
  }
}`,
            ...((P = (R = d.parameters) == null ? void 0 : R.docs) == null ? void 0 : P.source),
        },
    },
};
var L, B, N;
g.parameters = {
    ...g.parameters,
    docs: {
        ...((L = g.parameters) == null ? void 0 : L.docs),
        source: {
            originalSource: `{
  name: 'Avsluttet',
  args: {
    avtale: avsluttet
  }
}`,
            ...((N = (B = g.parameters) == null ? void 0 : B.docs) == null ? void 0 : N.source),
        },
    },
};
const ee = [
    'Annullert',
    'Avbrutt',
    'Påbegynt',
    'ManglerGodkjenningDeltakerHarGodkjent',
    'ManglerGodkjenningDeltakerHarIkkeGodkjent',
    'KlarForOppstart',
    'Gjennomføres',
    'Avsluttet',
];
export {
    a as Annullert,
    s as Avbrutt,
    g as Avsluttet,
    d as Gjennomføres,
    o as KlarForOppstart,
    i as ManglerGodkjenningDeltakerHarGodkjent,
    u as ManglerGodkjenningDeltakerHarIkkeGodkjent,
    l as Påbegynt,
    ee as __namedExportsOrder,
    Z as default,
};
