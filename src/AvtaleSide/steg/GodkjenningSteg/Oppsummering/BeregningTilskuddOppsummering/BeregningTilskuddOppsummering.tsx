import VisUtregningenPanel from '@/AvtaleSide/steg/BeregningTilskudd/VisUtregningenPanel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Beregningsgrunnlag, Kontonummer } from '@/types/avtale';
import { Element } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext } from 'react';
import HvaManglerOppsummering from '../HvaManglerOppsummering';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';

const BeregningTilskuddOppsummering: FunctionComponent<Beregningsgrunnlag & Kontonummer> = props => {
    const innloggetBruker = useContext(InnloggetBrukerContext);

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
            <VerticalSpacer twentyPx={true} />
            {innloggetBruker.erNavAnsatt &&
                props.manedslonn100pst &&
                props.stillingprosent !== undefined &&
                props.stillingprosent > 0 &&
                props.stillingprosent < 100 && (
                    <>
                        <Element>Lønn ved 100% stilling</Element>
                        {props.manedslonn100pst} kr
                    </>
                )}
        </Stegoppsummering>
    );
};

export default BeregningTilskuddOppsummering;
