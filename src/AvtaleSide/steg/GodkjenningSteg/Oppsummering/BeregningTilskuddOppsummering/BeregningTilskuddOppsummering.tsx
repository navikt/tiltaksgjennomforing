import UtregningPanel from '@/AvtaleSide/steg/BeregningTilskudd/UtregningPanel';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Beregningsgrunnlag, Kontonummer } from '@/types/avtale';
import { Label } from '@navikt/ds-react';
import React, { FunctionComponent, useContext } from 'react';
import HvaManglerOppsummering from '../HvaManglerOppsummering';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';

const BeregningTilskuddOppsummering: FunctionComponent<Beregningsgrunnlag & Kontonummer> = (props) => {
    const innloggetBruker = useContext(InnloggetBrukerContext);

    return (
        <Stegoppsummering tittel="Beregning av tilskudd">
            <Label>Kontonummer</Label> <SjekkOmVerdiEksisterer verdi={props.arbeidsgiverKontonummer} />
            <VerticalSpacer rem={1} />
            <Label>Utregning</Label>
            <HvaManglerOppsummering
                avhengigFelter={{
                    // I dette tilfellet skal 0 være en gyldig verdi på arbeidsgiveravgift og otp-sats.
                    arbeidsgiveravgift: props.arbeidsgiveravgift === 0 ? 1 : props.arbeidsgiveravgift,
                    otpSats: props.otpSats === 0 ? 1 : props.otpSats,
                    feriepengesats: props.feriepengesats,
                    lonnstilskuddProsent: props.lonnstilskuddProsent,
                    manedslonn: props.manedslonn,
                }}
            >
                <VerticalSpacer rem={1} />
                <UtregningPanel {...props} />
            </HvaManglerOppsummering>
            <VerticalSpacer rem={1.25} />
            {innloggetBruker.erNavAnsatt &&
                props.manedslonn100pst &&
                props.stillingprosent !== undefined &&
                props.stillingprosent > 0 &&
                props.stillingprosent < 100 && (
                    <>
                        <Label>Lønn ved 100% stilling</Label>
                        {props.manedslonn100pst} kr
                    </>
                )}
        </Stegoppsummering>
    );
};

export default BeregningTilskuddOppsummering;
