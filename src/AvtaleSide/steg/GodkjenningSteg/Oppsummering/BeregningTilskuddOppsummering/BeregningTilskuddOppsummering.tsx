import React, { FunctionComponent, useContext } from 'react';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import { Label } from '@navikt/ds-react';

import HvaManglerOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/HvaManglerOppsummering';
import SjekkOmVerdiEksisterer from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Stegoppsummering/Stegoppsummering';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Avtaleinnhold, Beregningsgrunnlag } from '@/types/avtale';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';

import styles from './BeregningTilskuddOppsummering.module.less';
import VisningTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/VisningTilskuddsperioder';

interface Props extends Beregningsgrunnlag, Pick<Avtaleinnhold, 'arbeidsgiverKontonummer' | 'arbeidsgiverKid'> {
    ekstraAvhengigFelter?: Partial<Avtaleinnhold>;
    utregningPanelKomponent?: FunctionComponent<Beregningsgrunnlag>;
}

const BeregningTilskuddOppsummering = (props: Props) => {
    const {
        arbeidsgiverKid,
        arbeidsgiverKontonummer,
        ekstraAvhengigFelter,
        utregningPanelKomponent: Beregningskomponent,
        ...beregningsgrunnlag
    } = props;
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const erDeltaker = innloggetBruker.rolle === 'DELTAKER';

    const avhengigFelter: Partial<Avtaleinnhold> = {
        arbeidsgiveravgift: beregningsgrunnlag.arbeidsgiveravgift,
        otpSats: beregningsgrunnlag.otpSats,
        feriepengesats: beregningsgrunnlag.feriepengesats,
        ...(ekstraAvhengigFelter || {}),
    };

    return (
        <Stegoppsummering tittel="Beregning av tilskudd">
            {!erDeltaker && (
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
            )}

            {Beregningskomponent && (
                <>
                    <VerticalSpacer rem={1} />
                    <HvaManglerOppsummering avhengigFelter={avhengigFelter}>
                        <Beregningskomponent {...beregningsgrunnlag} />
                    </HvaManglerOppsummering>
                    {innloggetBruker.erNavAnsatt &&
                        beregningsgrunnlag.manedslonn100pst &&
                        beregningsgrunnlag.stillingprosent !== undefined &&
                        beregningsgrunnlag.stillingprosent > 0 &&
                        beregningsgrunnlag.stillingprosent < 100 && (
                            <>
                                <VerticalSpacer rem={1.25} />
                                <Label>Lønn ved 100% stilling: {beregningsgrunnlag.manedslonn100pst} kr</Label>
                            </>
                        )}
                    <VerticalSpacer rem={1} />
                </>
            )}
            <VisningTilskuddsperioder />
        </Stegoppsummering>
    );
};

export default BeregningTilskuddOppsummering;
