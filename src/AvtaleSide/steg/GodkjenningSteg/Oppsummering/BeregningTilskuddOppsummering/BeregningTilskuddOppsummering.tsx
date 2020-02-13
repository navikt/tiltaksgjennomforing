import VisUtregningenPanel from '@/AvtaleSide/steg/BeregningTilskudd/VisUtregningenPanel';
import { Beregningsgrunnlag } from '@/types/avtale';
import React, { FunctionComponent } from 'react';
import HvaManglerOppsummering from '../HvaManglerOppsummering';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';

const BeregningTilskuddOppsummering: FunctionComponent<Beregningsgrunnlag> = props => {
    return (
        <Stegoppsummering tittel="Beregning av tilskudd">
            <HvaManglerOppsummering
                avhengigFelter={{
                    arbeidsgiveravgift: props.arbeidsgiveravgift,
                    feriepengesats: props.feriepengesats,
                    lonnstilskuddProsent: props.lonnstilskuddProsent,
                    manedslonn: props.manedslonn,
                }}
            >
                <VisUtregningenPanel {...props} />
            </HvaManglerOppsummering>
        </Stegoppsummering>
    );
};

export default BeregningTilskuddOppsummering;
