import ArbeidsoppgaverSteg from '@/AvtaleSide/steg/ArbeidsoppgaverSteg/ArbeidsoppgaverSteg';
import { StegInfo } from '@/AvtaleSide/AvtaleSide';
import BeregningTilskuddSteg from '@/AvtaleSide/steg/BeregningTilskudd/BeregningTilskuddSteg';
import GodkjenningSteg from '@/AvtaleSide/steg/GodkjenningSteg/GodkjenningSteg';
import OppsummeringArbeidstrening from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringArbeidstrening/OppsummeringArbeidstrening';
import OppsummeringLonnstilskudd from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringLonnstilskudd/OppsummeringLonnstilskudd';
import KontaktinfoSteg from '@/AvtaleSide/steg/KontaktInformasjonSteg/KontaktinfoSteg';
import MaalSteg from '@/AvtaleSide/steg/MaalSteg/MaalSteg';
import OppfolgingTilretteleggingSteg from '@/AvtaleSide/steg/OppfolgingOgTilretteleggingSteg/OppfolgingOgTilretteleggingSteg';
import StillingSteg from '@/AvtaleSide/steg/StillingSteg/StillingSteg';
import React from 'react';
import VarighetSteg from '@/AvtaleSide/steg/VarighetSteg/VarighetSteg';
import OmMentorSteg from '@/AvtaleSide/steg/OmMentorSteg/OmMentorSteg';
import OppsummeringMentor from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringMentor/OppsummeringMentor';

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
        komponent: <ArbeidsoppgaverSteg />,
        label: 'Arbeidsoppgaver',
        id: 'arbeidsoppgaver',
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
        label: 'Oppfølging og tilrettelegging',
        id: 'oppfolging',
    },
    {
        komponent: <BeregningTilskuddSteg />,
        label: 'Beregning av tilskudd',
        id: 'beregningtilskudd',
    },
    {
        komponent: <GodkjenningSteg oppsummering={OppsummeringLonnstilskudd} />,
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
        komponent: <GodkjenningSteg oppsummering={OppsummeringMentor} />,
        label: 'Godkjenning',
        id: 'godkjenning',
    },
];

const hentAvtaleSteg = {
    ARBEIDSTRENING: arbeidstreningSteg,
    VARIG_LONNSTILSKUDD: lonnstilskuddSteg,
    MIDLERTIDIG_LONNSTILSKUDD: lonnstilskuddSteg,
    MENTOR: mentorSteg,
};

export default hentAvtaleSteg;
