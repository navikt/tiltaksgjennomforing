import VisUtregningenPanel from '@/AvtaleSide/steg/BeregningTilskudd/VisUtregningenPanel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Beregningsgrunnlag, Kontonummer } from '@/types/avtale';
import { Element } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext } from 'react';
import HvaManglerOppsummering from '../HvaManglerOppsummering';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import ValutaInput from '@/komponenter/form/ValutaInput';
import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';

const BeregningTilskuddOppsummering: FunctionComponent<Beregningsgrunnlag & Kontonummer> = props => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);

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
                <VerticalSpacer twentyPx={true} />

                {innloggetBruker.erNavAnsatt &&
                    avtale.manedslonn100pst &&
                    avtale.stillingprosent !== undefined &&
                    avtale.stillingprosent > 0 &&
                    avtale.stillingprosent < 100 && (
                        <ValutaInput
                            disabled={true}
                            name="manedslonn100%"
                            bredde="S"
                            label="Lønn ved 100% stilling"
                            value={avtale.manedslonn100pst}
                        />
                    )}
                <VerticalSpacer thirtyTwoPx={true} />
            </HvaManglerOppsummering>
            <VerticalSpacer sixteenPx={true} />
        </Stegoppsummering>
    );
};

export default BeregningTilskuddOppsummering;
