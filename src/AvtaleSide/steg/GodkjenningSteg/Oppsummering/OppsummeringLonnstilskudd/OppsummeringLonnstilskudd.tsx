import { medContext } from '@/AvtaleContext';
import OppfolgingOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/oppfølging/OppfolgingOppsummering';
import { Avtale } from '@/types/avtale';
import React, { FunctionComponent } from 'react';
import BeregningTilskuddOppsummering from '../BeregningTilskuddOppsummering/BeregningTilskuddOppsummering';
import LonnstilskuddOppsummering from '../LonnstilskuddOppsummering/LonnstilskuddOppsummering';
import StillingsOppsummering from '../StillingsOppsummering/StillingsOppsummering';

interface Props {
    avtale: Avtale;
}

const OppsummeringLonnstilskudd: FunctionComponent<Props> = props => (
    <>
        <StillingsOppsummering />
        <LonnstilskuddOppsummering />
        <OppfolgingOppsummering {...props.avtale} />
        <BeregningTilskuddOppsummering />
    </>
);

export default medContext(OppsummeringLonnstilskudd);
