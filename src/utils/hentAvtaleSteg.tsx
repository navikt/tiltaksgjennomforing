import { StegInfo } from '@/AvtaleSide/AvtaleSide';
import BeregningTilskuddSteg from '@/AvtaleSide/steg/BeregningTilskudd/BeregningTilskuddSteg';
import BeregningVTAOTilskuddSteg from '@/AvtaleSide/steg/BeregningTilskudd/BeregningVTAOTilskuddSteg';
import GodkjenningSteg from '@/AvtaleSide/steg/GodkjenningSteg/GodkjenningSteg';
import OppsummeringArbeidstrening from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringArbeidstrening/OppsummeringArbeidstrening';
import OppsummeringInkluderingstilskudd from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringInkluderingstilskudd/OppsummeringInkluderingstilskudd';
import OppsummeringLonnstilskudd from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringLonnstilskudd/OppsummeringLonnstilskudd';
import OppsummeringMentor from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringMentor/OppsummeringMentor';
import OppsummeringVTAO from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringVTAO/OppsummeringVTAO';
import InkluderingstilskuddSteg from '@/AvtaleSide/steg/InkluderingstilskuddSteg/InkluderingstilskuddSteg';
import KontaktinfoSteg from '@/AvtaleSide/steg/KontaktInformasjonSteg/KontaktinfoSteg';
import MaalSteg from '@/AvtaleSide/steg/MaalSteg/MaalSteg';
import OmMentorSteg from '@/AvtaleSide/steg/OmMentorSteg/OmMentorSteg';
import OppfolgingTilretteleggingSteg from '@/AvtaleSide/steg/OppfolgingOgTilretteleggingSteg/OppfolgingOgTilretteleggingSteg';
import StillingSteg from '@/AvtaleSide/steg/StillingSteg/StillingSteg';
import VarighetSteg from '@/AvtaleSide/steg/VarighetSteg/VarighetSteg';
import BeregningMentorTilskuddSteg from '@/AvtaleSide/steg/BeregningTilskudd/BeregningMentorTilskuddSteg';
import VisningTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/VisningTilskuddsperioder';
import VisningTilskuddsperioderTabellVtao from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/VisningTilskuddsperioderTabellVtao';

const arbeidstreningSteg: StegInfo[] = [
    {
        komponent: <KontaktinfoSteg />,
        label: 'Kontaktinformasjon',
        id: 'kontaktinformasjon',
    },
    {
        komponent: <MaalSteg />,
        label: 'Mål',
        id: 'maal',
    },
    {
        komponent: <StillingSteg />,
        label: 'Stilling',
        id: 'stilling',
    },
    {
        komponent: <VarighetSteg />,
        label: 'Varighet',
        id: 'varighet',
    },
    {
        komponent: <OppfolgingTilretteleggingSteg />,
        label: 'Oppfølging',
        id: 'oppfolging',
    },
    {
        komponent: <GodkjenningSteg oppsummering={OppsummeringArbeidstrening} />,
        label: 'Godkjenning',
        id: 'godkjenning',
    },
];

const lonnstilskuddSteg: StegInfo[] = [
    {
        komponent: <KontaktinfoSteg />,
        label: 'Kontaktinformasjon',
        id: 'kontaktinformasjon',
    },
    {
        komponent: <VarighetSteg />,
        label: 'Varighet',
        id: 'varighet',
    },
    {
        komponent: <StillingSteg />,
        label: 'Stilling',
        id: 'stilling',
    },
    {
        komponent: <OppfolgingTilretteleggingSteg />,
        label: 'Oppfølging',
        id: 'oppfolging',
    },
    {
        komponent: <BeregningTilskuddSteg />,
        label: 'Beregning av tilskudd',
        id: 'beregningtilskudd',
    },
    {
        komponent: (
            <GodkjenningSteg
                oppsummering={OppsummeringLonnstilskudd}
                visningTilskuddsperioder={VisningTilskuddsperioder}
            />
        ),
        label: 'Godkjenning',
        id: 'godkjenning',
    },
];

const mentorSteg: StegInfo[] = [
    {
        komponent: <KontaktinfoSteg />,
        label: 'Kontaktinformasjon',
        id: 'kontaktinformasjon',
    },
    {
        komponent: <OmMentorSteg />,
        label: 'Om mentoren',
        id: 'mentoren',
    },
    {
        komponent: <VarighetSteg />,
        label: 'Varighet',
        id: 'varighet',
    },
    {
        komponent: <OppfolgingTilretteleggingSteg />,
        label: 'Oppfølging og tilrettelegging',
        id: 'oppfolging',
    },
    {
        komponent: <BeregningMentorTilskuddSteg />,
        label: 'Beregning av tilskudd',
        id: 'beregningtilskudd',
    },
    {
        komponent: (
            <GodkjenningSteg
                oppsummering={OppsummeringMentor}
                visningTilskuddsperioder={VisningTilskuddsperioderTabellVtao}
            />
        ),
        label: 'Godkjenning',
        id: 'godkjenning',
    },
];

const mentorStegUtenBeregningAvTilskudd: StegInfo[] = [
    {
        komponent: <KontaktinfoSteg />,
        label: 'Kontaktinformasjon',
        id: 'kontaktinformasjon',
    },
    {
        komponent: <OmMentorSteg />,
        label: 'Om mentoren',
        id: 'mentoren',
    },
    {
        komponent: <VarighetSteg />,
        label: 'Varighet',
        id: 'varighet',
    },
    {
        komponent: <OppfolgingTilretteleggingSteg />,
        label: 'Oppfølging og tilrettelegging',
        id: 'oppfolging',
    },
    {
        komponent: <GodkjenningSteg oppsummering={OppsummeringMentor} />,
        label: 'Godkjenning',
        id: 'godkjenning',
    },
];

const mentorInnsynSteg: StegInfo[] = [
    {
        komponent: (
            <GodkjenningSteg
                oppsummering={OppsummeringMentor}
                visningTilskuddsperioder={VisningTilskuddsperioder}
                mentorVinsing={true}
            />
        ),
        label: 'Godkjenning',
        id: 'godkjenning',
    },
];
const inkluderingTilskuddSteg: StegInfo[] = [
    {
        komponent: <KontaktinfoSteg />,
        label: 'Kontaktinformasjon',
        id: 'kontaktinformasjon',
    },
    {
        komponent: <InkluderingstilskuddSteg />,
        label: 'Inkluderingstilskudd',
        id: 'inkluderingstilskudd',
    },
    {
        komponent: <OppfolgingTilretteleggingSteg />,
        label: 'Oppfølging og tilrettelegging',
        id: 'oppfolging',
    },
    {
        komponent: <GodkjenningSteg oppsummering={OppsummeringInkluderingstilskudd} />,
        label: 'Godkjenning',
        id: 'godkjenning',
    },
];

const vtaoSteg: StegInfo[] = [
    {
        komponent: <KontaktinfoSteg />,
        label: 'Kontaktinformasjon',
        id: 'kontaktinformasjon',
    },
    {
        komponent: <VarighetSteg />,
        label: 'Varighet',
        id: 'varighet',
    },
    {
        komponent: <StillingSteg />,
        label: 'Stilling',
        id: 'stilling',
    },
    {
        komponent: <OppfolgingTilretteleggingSteg />,
        label: 'Oppfølging og tilrettelegging',
        id: 'oppfolging',
    },
    {
        komponent: <BeregningVTAOTilskuddSteg />,
        label: 'Beregning av tilskudd',
        id: 'beregningtilskudd',
    },
    {
        komponent: (
            <GodkjenningSteg oppsummering={OppsummeringVTAO} visningTilskuddsperioder={VisningTilskuddsperioder} />
        ),
        label: 'Godkjenning',
        id: 'godkjenning',
    },
];

const hentAvtaleSteg = {
    ARBEIDSTRENING: arbeidstreningSteg,
    VARIG_LONNSTILSKUDD: lonnstilskuddSteg,
    MIDLERTIDIG_LONNSTILSKUDD: lonnstilskuddSteg,
    MENTOR: mentorSteg,
    MENTOR_UTEN_BEREGNING_AV_TILSKUDD: mentorStegUtenBeregningAvTilskudd,
    MENTOR_INNSYN: mentorInnsynSteg,
    INKLUDERINGSTILSKUDD: inkluderingTilskuddSteg,
    SOMMERJOBB: lonnstilskuddSteg,
    VTAO: vtaoSteg,
};

export default hentAvtaleSteg;
