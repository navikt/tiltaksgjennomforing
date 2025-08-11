import React, { useContext } from 'react';
import { Column, Container, Row } from '@/komponenter/NavGrid/Grid';
import { Label } from '@navikt/ds-react';

import HvaManglerOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/HvaManglerOppsummering';
import SjekkOmVerdiEksisterer from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Stegoppsummering/Stegoppsummering';
import UtregningPanel from '@/AvtaleSide/steg/BeregningTilskudd/UtregningPanel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Avtaleinnhold, Beregningsgrunnlag } from '@/types/avtale';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';

import styles from './BeregningTilskuddOppsummering.module.less';

interface Props extends Beregningsgrunnlag, Pick<Avtaleinnhold, 'arbeidsgiverKontonummer' | 'arbeidsgiverKid'> {
    erVtao?: boolean;
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
        erVtao = false,
    } = props;

    const innloggetBruker = useContext(InnloggetBrukerContext);

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
                {!erVtao && (
                    <Row className={styles.row}>
                        <Column md="12" sm="12" xs="12">
                            <Label>Utregning</Label>
                            <HvaManglerOppsummering
                                avhengigFelter={{
                                    arbeidsgiveravgift,
                                    otpSats,
                                    feriepengesats,
                                    lonnstilskuddProsent,
                                    manedslonn,
                                }}
                            >
                                <VerticalSpacer rem={1} />
                                <UtregningPanel {...props} />
                            </HvaManglerOppsummering>
                            <VerticalSpacer rem={1.25} />
                            {innloggetBruker.erNavAnsatt &&
                                manedslonn100pst &&
                                stillingprosent !== undefined &&
                                stillingprosent > 0 &&
                                stillingprosent < 100 && (
                                    <>
                                        <Label>Lønn ved 100% stilling </Label>
                                        {manedslonn100pst} kr
                                    </>
                                )}
                        </Column>
                    </Row>
                )}
            </Container>
        </Stegoppsummering>
    );
};

export default BeregningTilskuddOppsummering;
