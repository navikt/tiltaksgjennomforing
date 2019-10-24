import ArbeidsoppgaverSteg from '@/AvtaleSide/ArbeidsoppgaverSteg/ArbeidsoppgaverSteg';
import ArbeidstidSteg from '@/AvtaleSide/ArbeidstidSteg/ArbeidstidSteg';
import { StegInfo } from '@/AvtaleSide/AvtaleSide';
import BeregningTilskudd from '@/AvtaleSide/BeregningTilskudd/BeregningTilskudd';
import GodkjenningSteg from '@/AvtaleSide/GodkjenningSteg/GodkjenningSteg';
import Oppsummering from '@/AvtaleSide/GodkjenningSteg/Oppsummering/oppsummering/Oppsummering';
import OppsummeringLonnstilskudd from '@/AvtaleSide/GodkjenningSteg/Oppsummering/OppsummeringLonnstilskudd/OppsummeringLonnstilskudd';
import KontaktinfoSteg from '@/AvtaleSide/KontaktInformasjonSteg/KontaktinfoSteg';
import LonnstilskuddVarighet from '@/AvtaleSide/LonnstilskuddVarighet/LonnstilskuddVarighet';
import MaalSteg from '@/AvtaleSide/MaalSteg/MaalSteg';
import OppfolgingTilretteleggingSteg from '@/AvtaleSide/OppfolgingOgTilretteleggingSteg/OppfolgingOgTilretteleggingSteg';
import StillingSteg from '@/AvtaleSide/StillingSteg/StillingSteg';
import React from 'react';

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
        komponent: <ArbeidstidSteg />,
        label: 'Arbeidstid',
        id: 'arbeidstid',
    },
    {
        komponent: <OppfolgingTilretteleggingSteg />,
        label: 'Oppfølging og tilrettelegging',
        id: 'oppfolging',
    },
    {
        komponent: <GodkjenningSteg oppsummering={<Oppsummering />} />,
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
        komponent: <StillingSteg />,
        label: 'Stilling',
        id: 'stilling',
    },
    {
        komponent: <LonnstilskuddVarighet />,
        label: 'Lønnstilskudd og varighet',
        id: 'lonnstilskuddvarighet',
    },
    {
        komponent: <OppfolgingTilretteleggingSteg />,
        label: 'Oppfølging og tilrettelegging',
        id: 'oppfolging',
    },
    {
        komponent: <BeregningTilskudd />,
        label: 'Beregning av tilskudd',
        id: 'beregningtilskudd',
    },
    {
        komponent: (
            <GodkjenningSteg oppsummering={<OppsummeringLonnstilskudd />} />
        ),
        label: 'Godkjenning',
        id: 'godkjenning',
    },
];

const hentAvtaleSteg = {
    ARBEIDSTRENING: arbeidstreningSteg,
    VARIG_LONNSTILSKUDD: lonnstilskuddSteg,
    MIDLERTIDIG_LONNSTILSKUDD: lonnstilskuddSteg,
};

export default hentAvtaleSteg;
