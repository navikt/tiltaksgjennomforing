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
                    // I dette tilfellet ønsker skal 0 være en gyldig verdi på arbeidsgiveravgift.
                    arbeidsgiveravgift: props.arbeidsgiveravgift === 0 ? 1 : props.arbeidsgiveravgift,
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
