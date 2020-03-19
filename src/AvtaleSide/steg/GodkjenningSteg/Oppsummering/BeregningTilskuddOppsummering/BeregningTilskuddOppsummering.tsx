import VisUtregningenPanel from '@/AvtaleSide/steg/BeregningTilskudd/VisUtregningenPanel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Beregningsgrunnlag, Kontonummer } from '@/types/avtale';
import { Element } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import HvaManglerOppsummering from '../HvaManglerOppsummering';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';

const BeregningTilskuddOppsummering: FunctionComponent<Beregningsgrunnlag & Kontonummer> = props => {
    return (
        <Stegoppsummering tittel="Beregning av tilskudd">
            <Element>Kontonummer</Element> <SjekkOmVerdiEksisterer verdi={props.arbeidsgiverKontonummer} />
            <VerticalSpacer sixteenPx={true} />
            <Element>Utregning</Element>
            <HvaManglerOppsummering
                avhengigFelter={{
                    // I dette tilfellet ønsker skal 0 være en gyldig verdi på arbeidsgiveravgift.
                    arbeidsgiveravgift: props.arbeidsgiveravgift === 0 ? 1 : props.arbeidsgiveravgift,
                    feriepengesats: props.feriepengesats,
                    lonnstilskuddProsent: props.lonnstilskuddProsent,
                    manedslonn: props.manedslonn,
                }}
            >
                <VerticalSpacer sixteenPx={true} />
                <VisUtregningenPanel {...props} />
            </HvaManglerOppsummering>
        </Stegoppsummering>
    );
};

export default BeregningTilskuddOppsummering;
