import { StegInfo } from '@/AvtaleSide/AvtaleSide';
import BeregningTilskuddSteg from '@/AvtaleSide/steg/BeregningTilskudd/BeregningTilskuddSteg';
import BeregningVTAOTilskuddSteg from '@/AvtaleSide/steg/BeregningTilskudd/BeregningVTAOTilskuddSteg';
import GodkjenningSteg from '@/AvtaleSide/steg/GodkjenningSteg/GodkjenningSteg';
import InkluderingstilskuddSteg from '@/AvtaleSide/steg/InkluderingstilskuddSteg/InkluderingstilskuddSteg';
import KontaktinfoSteg from '@/AvtaleSide/steg/KontaktInformasjonSteg/KontaktinfoSteg';
import MaalSteg from '@/AvtaleSide/steg/MaalSteg/MaalSteg';
import OmMentorSteg from '@/AvtaleSide/steg/OmMentorSteg/OmMentorSteg';
import OppfolgingTilretteleggingSteg from '@/AvtaleSide/steg/OppfolgingOgTilretteleggingSteg/OppfolgingOgTilretteleggingSteg';
import StillingSteg from '@/AvtaleSide/steg/StillingSteg/StillingSteg';
import VarighetSteg from '@/AvtaleSide/steg/VarighetSteg/VarighetSteg';
import BeregningMentorTilskuddSteg from '@/AvtaleSide/steg/BeregningTilskudd/BeregningMentorTilskuddSteg';

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
        komponent: <GodkjenningSteg />,
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
        komponent: <GodkjenningSteg />,
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
        komponent: <GodkjenningSteg />,
        label: 'Godkjenning',
        id: 'godkjenning',
    },
];

const mentorInnsynSteg: StegInfo[] = [
    {
        komponent: <GodkjenningSteg />,
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
        komponent: <GodkjenningSteg />,
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
        komponent: <GodkjenningSteg />,
        label: 'Godkjenning',
        id: 'godkjenning',
    },
];

const hentAvtaleSteg = {
    ARBEIDSTRENING: arbeidstreningSteg,
    VARIG_LONNSTILSKUDD: lonnstilskuddSteg,
    MIDLERTIDIG_LONNSTILSKUDD: lonnstilskuddSteg,
    MENTOR: mentorSteg,
    MENTOR_INNSYN: mentorInnsynSteg,
    INKLUDERINGSTILSKUDD: inkluderingTilskuddSteg,
    SOMMERJOBB: lonnstilskuddSteg,
    VTAO: vtaoSteg,
    FIREARIG_LONNSTILSKUDD: lonnstilskuddSteg,
};

export default hentAvtaleSteg;
