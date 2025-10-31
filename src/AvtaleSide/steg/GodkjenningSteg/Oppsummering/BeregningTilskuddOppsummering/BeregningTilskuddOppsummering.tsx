import React, { createElement, useContext } from 'react';
import { Column, Container, Row } from '@/komponenter/NavGrid/Grid';
import { Label } from '@navikt/ds-react';

import HvaManglerOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/HvaManglerOppsummering';
import SjekkOmVerdiEksisterer from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Stegoppsummering/Stegoppsummering';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Avtaleinnhold, Beregningsgrunnlag } from '@/types/avtale';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';

import styles from './BeregningTilskuddOppsummering.module.less';

interface Props extends Beregningsgrunnlag, Pick<Avtaleinnhold, 'arbeidsgiverKontonummer' | 'arbeidsgiverKid'> {
    utregningComponent?: React.ComponentType<Props>;
}

const BeregningTilskuddOppsummering = (props: Props) => {
    const {
        arbeidsgiverKid,
        arbeidsgiverKontonummer,
        arbeidsgiveravgift,
        feriepengesats,
        lonnstilskuddProsent,
        manedslonn,
        manedslonn100pst,
        otpSats,
        stillingprosent,
        utregningComponent,
    } = props;

    const innloggetBruker = useContext(InnloggetBrukerContext);

    console.log('BeregningTilskuddOppsummering props:', props);

    return (
        <Stegoppsummering tittel="Beregning av tilskudd">
            <Container fluid={true}>
                <Row className={styles.row}>
                    <Column md="4" sm="6" xs="6">
                        <Label>Kontonummer</Label>
                        <SjekkOmVerdiEksisterer verdi={arbeidsgiverKontonummer} />
                    </Column>
                    {arbeidsgiverKid && (
                        <Column md="4" sm="6" xs="6">
                            <Label>KID-nummer</Label>
                            <SjekkOmVerdiEksisterer verdi={arbeidsgiverKid} />
                        </Column>
                    )}
                </Row>
                {utregningComponent && (
                    <Row className={styles.row}>
                        <Label>Utregning</Label>
                        <HvaManglerOppsummering
                            avhengigFelter={{
                                arbeidsgiveravgift,
                                otpSats,
                                feriepengesats,
                                //    lonnstilskuddProsent,
                                manedslonn,
                            }}
                        >
                            <VerticalSpacer rem={1} />
                            {createElement(utregningComponent, { ...props })}
                        </HvaManglerOppsummering>

                        {innloggetBruker.erNavAnsatt &&
                            manedslonn100pst &&
                            stillingprosent !== undefined &&
                            stillingprosent > 0 &&
                            stillingprosent < 100 && (
                                <>
                                    <VerticalSpacer rem={1.25} />
                                    <Label>Lønn ved 100% stilling </Label>
                                    {manedslonn100pst} kr
                                </>
                            )}
                    </Row>
                )}
            </Container>
        </Stegoppsummering>
    );
};

export default BeregningTilskuddOppsummering;
