import { j as e, S as r, B as t, A as V, G as _, V as v, f as H } from './Gjennomføres-DDe6u6XI.js';
import { K as z } from './KlarForOppstart-D5TZALq-.js';
import './index-CsdIBAqE.js';
const w = ({ avtale: n }) => {
    if (n.erUfordelt)
        return e.jsx(r, {
            header: 'Avtalen er ikke fordelt til en veileder i NAV enda',
            body: e.jsx(t, {
                size: 'small',
                children:
                    'Du kan likevel begynne å fylle ut avtalen. Når avtalen har blitt tildelt en veileder kan alle parter godkjenne avtalen.',
            }),
        });
    switch (n.statusSomEnum) {
        case 'ANNULLERT':
            return e.jsx(r, {
                header: 'Tiltaket er annullert',
                body: e.jsxs(t, {
                    size: 'small',
                    children: ['Veileder har annullert tiltaket ', H(n.annullertTidspunkt), '.'],
                }),
            });
        case 'AVBRUTT':
            return e.jsx(r, {
                header: 'Tiltaket er avbrutt',
                body: e.jsx(t, { size: 'small', children: 'Veileder har avbrutt tiltaket' }),
            });
        case 'PÅBEGYNT':
            return e.jsx(r, { header: 'Du må fylle ut avtalen' });
        case 'MANGLER_GODKJENNING':
            return n.godkjentAvArbeidsgiver
                ? e.jsx(r, {
                      header: 'Vent til de andre har godkjent',
                      body: e.jsxs(e.Fragment, {
                          children: [
                              e.jsx(t, {
                                  size: 'small',
                                  children: 'Du har godkjent avtalen. Venter nå på godkjenning fra NAV.',
                              }),
                              e.jsx(v, { rem: 2 }),
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
                              e.jsx(v, { rem: 2 }),
                          ],
                      }),
                  });
        case 'KLAR_FOR_OPPSTART':
            return e.jsx(z, { avtaleInngått: n.avtaleInngått, startDato: n.gjeldendeInnhold.startDato });
        case 'GJENNOMFØRES':
            return e.jsx(_, { avtaleInngått: n.avtaleInngått, startDato: n.gjeldendeInnhold.startDato });
        case 'AVSLUTTET':
            return e.jsx(V, { startDato: n.gjeldendeInnhold.startDato, sluttDato: n.gjeldendeInnhold.sluttDato });
    }
    return null;
};
w.__docgenInfo = {
    description: '',
    methods: [],
    displayName: 'ArbeidsgiverAvtaleStatus',
    props: {
        avtale: {
            required: !0,
            tsType: {
                name: 'intersection',
                raw: `Pick<Avtale, 'erUfordelt' | 'statusSomEnum' | 'annullertTidspunkt' | 'godkjentAvArbeidsgiver' | 'avtaleInngått' | 'annullertGrunn' | 'avbruttGrunn'>
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
                                raw: "'erUfordelt' | 'statusSomEnum' | 'annullertTidspunkt' | 'godkjentAvArbeidsgiver' | 'avtaleInngått' | 'annullertGrunn' | 'avbruttGrunn'",
                                elements: [
                                    { name: 'literal', value: "'erUfordelt'" },
                                    { name: 'literal', value: "'statusSomEnum'" },
                                    { name: 'literal', value: "'annullertTidspunkt'" },
                                    { name: 'literal', value: "'godkjentAvArbeidsgiver'" },
                                    { name: 'literal', value: "'avtaleInngått'" },
                                    { name: 'literal', value: "'annullertGrunn'" },
                                    { name: 'literal', value: "'avbruttGrunn'" },
                                ],
                            },
                        ],
                        raw: "Pick<Avtale, 'erUfordelt' | 'statusSomEnum' | 'annullertTidspunkt' | 'godkjentAvArbeidsgiver' | 'avtaleInngått' | 'annullertGrunn' | 'avbruttGrunn'>",
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
const ae = { title: 'Tiltaksgjennomforing/Statuser/Arbeidsgiver', component: w, parameters: { layout: 'fullscreen' } },
    J = {
        erUfordelt: !0,
        statusSomEnum: 'ANNULLERT',
        annullertTidspunkt: '2021-08-01',
        godkjentAvArbeidsgiver: '20-08-01',
        avtaleInngått: '2021-08-01',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    a = { name: 'Annullert', args: { avtale: J } },
    Y = {
        erUfordelt: !1,
        statusSomEnum: 'ANNULLERT',
        annullertTidspunkt: '2021-08-01',
        godkjentAvArbeidsgiver: '20-08-01',
        avtaleInngått: '2021-08-01',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    s = { name: 'Annullert', args: { avtale: Y } },
    $ = {
        erUfordelt: !1,
        statusSomEnum: 'AVBRUTT',
        annullertTidspunkt: '2021-08-01',
        godkjentAvArbeidsgiver: '20-08-01',
        avtaleInngått: '2021-08-01',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    l = { name: 'Avbrutt', args: { avtale: $ } },
    C = {
        erUfordelt: !1,
        statusSomEnum: 'PÅBEGYNT',
        annullertTidspunkt: '2021-08-01',
        godkjentAvArbeidsgiver: '20-08-01',
        avtaleInngått: '2021-08-01',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    i = { name: 'Påbegynt', args: { avtale: C } },
    Q = {
        erUfordelt: !1,
        statusSomEnum: 'MANGLER_GODKJENNING',
        annullertTidspunkt: '',
        godkjentAvArbeidsgiver: '2024-05-03T12:26:24.40876',
        avtaleInngått: '',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    u = {
        name: 'Mangler Godkjenning Arbeidisgiver har godkjent men manger godkjenning av Deltakeren og Veileder',
        args: { avtale: Q },
    },
    W = {
        erUfordelt: !1,
        statusSomEnum: 'MANGLER_GODKJENNING',
        annullertTidspunkt: '',
        godkjentAvArbeidsgiver: '',
        avtaleInngått: '',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    o = { name: ' Mangler Godkjenning Arbeidsgiver har ikke godkjent avtalen enda', args: { avtale: W } },
    X = {
        erUfordelt: !1,
        statusSomEnum: 'KLAR_FOR_OPPSTART',
        annullertTidspunkt: '',
        godkjentAvArbeidsgiver: '',
        avtaleInngått: '2021-08-01',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    d = { name: 'Klar For Oppstart', args: { avtale: X } },
    Z = {
        erUfordelt: !1,
        statusSomEnum: 'GJENNOMFØRES',
        annullertTidspunkt: '',
        godkjentAvArbeidsgiver: '',
        avtaleInngått: '2021-08-01',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    g = { name: 'Gjennomføres', args: { avtale: Z } },
    ee = {
        erUfordelt: !1,
        statusSomEnum: 'AVSLUTTET',
        annullertTidspunkt: '',
        godkjentAvArbeidsgiver: '',
        avtaleInngått: '',
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    m = { name: 'Avsluttet', args: { avtale: ee } };
var k, b, f;
a.parameters = {
    ...a.parameters,
    docs: {
        ...((k = a.parameters) == null ? void 0 : k.docs),
        source: {
            originalSource: `{
  name: 'Annullert',
  args: {
    avtale: erUfordelt
  }
}`,
            ...((f = (b = a.parameters) == null ? void 0 : b.docs) == null ? void 0 : f.source),
        },
    },
};
var p, y, c;
s.parameters = {
    ...s.parameters,
    docs: {
        ...((p = s.parameters) == null ? void 0 : p.docs),
        source: {
            originalSource: `{
  name: 'Annullert',
  args: {
    avtale: annullert
  }
}`,
            ...((c = (y = s.parameters) == null ? void 0 : y.docs) == null ? void 0 : c.source),
        },
    },
};
var j, A, q;
l.parameters = {
    ...l.parameters,
    docs: {
        ...((j = l.parameters) == null ? void 0 : j.docs),
        source: {
            originalSource: `{
  name: 'Avbrutt',
  args: {
    avtale: avbrutt
  }
}`,
            ...((q = (A = l.parameters) == null ? void 0 : A.docs) == null ? void 0 : q.source),
        },
    },
};
var T, h, D;
i.parameters = {
    ...i.parameters,
    docs: {
        ...((T = i.parameters) == null ? void 0 : T.docs),
        source: {
            originalSource: `{
  name: 'Påbegynt',
  args: {
    avtale: påbegynt
  }
}`,
            ...((D = (h = i.parameters) == null ? void 0 : h.docs) == null ? void 0 : D.source),
        },
    },
};
var G, I, E;
u.parameters = {
    ...u.parameters,
    docs: {
        ...((G = u.parameters) == null ? void 0 : G.docs),
        source: {
            originalSource: `{
  name: 'Mangler Godkjenning Arbeidisgiver har godkjent men manger godkjenning av Deltakeren og Veileder',
  args: {
    avtale: manglerGodkjenningArbeidsgiverHarGodkjent
  }
}`,
            ...((E = (I = u.parameters) == null ? void 0 : I.docs) == null ? void 0 : E.source),
        },
    },
};
var F, S, K;
o.parameters = {
    ...o.parameters,
    docs: {
        ...((F = o.parameters) == null ? void 0 : F.docs),
        source: {
            originalSource: `{
  name: ' Mangler Godkjenning Arbeidsgiver har ikke godkjent avtalen enda',
  args: {
    avtale: manglerGodkjenningArbeidsgiverHarIkkeGodkjent
  }
}`,
            ...((K = (S = o.parameters) == null ? void 0 : S.docs) == null ? void 0 : K.source),
        },
    },
};
var R, P, L;
d.parameters = {
    ...d.parameters,
    docs: {
        ...((R = d.parameters) == null ? void 0 : R.docs),
        source: {
            originalSource: `{
  name: 'Klar For Oppstart',
  args: {
    avtale: klarForOppstart
  }
}`,
            ...((L = (P = d.parameters) == null ? void 0 : P.docs) == null ? void 0 : L.source),
        },
    },
};
var N, B, U;
g.parameters = {
    ...g.parameters,
    docs: {
        ...((N = g.parameters) == null ? void 0 : N.docs),
        source: {
            originalSource: `{
  name: 'Gjennomføres',
  args: {
    avtale: gjennomføres
  }
}`,
            ...((U = (B = g.parameters) == null ? void 0 : B.docs) == null ? void 0 : U.source),
        },
    },
};
var M, x, O;
m.parameters = {
    ...m.parameters,
    docs: {
        ...((M = m.parameters) == null ? void 0 : M.docs),
        source: {
            originalSource: `{
  name: 'Avsluttet',
  args: {
    avtale: avsluttet
  }
}`,
            ...((O = (x = m.parameters) == null ? void 0 : x.docs) == null ? void 0 : O.source),
        },
    },
};
const se = [
    'ErUfordelt',
    'Annullert',
    'Avbrutt',
    'Påbegynt',
    'ManglerGodkjenningArbeidsgiverHarGodkjent',
    'ManglerGodkjenningArbeidsgiverHarIkkeGodkjent',
    'KlarForOppstart',
    'Gjennomføres',
    'Avsluttet',
];
export {
    s as Annullert,
    l as Avbrutt,
    m as Avsluttet,
    a as ErUfordelt,
    g as Gjennomføres,
    d as KlarForOppstart,
    u as ManglerGodkjenningArbeidsgiverHarGodkjent,
    o as ManglerGodkjenningArbeidsgiverHarIkkeGodkjent,
    i as Påbegynt,
    se as __namedExportsOrder,
    ae as default,
};
