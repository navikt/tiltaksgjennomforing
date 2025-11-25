import React, { useContext } from 'react';
import { Column, Container, Row } from '@/komponenter/NavGrid/Grid';
import { Label } from '@navikt/ds-react';

import HvaManglerOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/HvaManglerOppsummering';
import SjekkOmVerdiEksisterer from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Stegoppsummering/Stegoppsummering';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Avtaleinnhold, Beregningsgrunnlag } from '@/types/avtale';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import UtregningPanel from '@/AvtaleSide/steg/BeregningTilskudd/UtregningPanel';
import UtregningPanelMentorTilskudd from '@/AvtaleSide/steg/BeregningTilskudd/UtregningPanelMentorTilskudd';

import styles from './BeregningTilskuddOppsummering.module.less';
import { AvtaleContext } from '@/AvtaleProvider';

interface Props extends Beregningsgrunnlag, Pick<Avtaleinnhold, 'arbeidsgiverKontonummer' | 'arbeidsgiverKid'> {
    ekstraAvhengigFelter?: Partial<Avtaleinnhold>;
}

function getUtregningPanelComponentType(
    tiltakstype: Beregningsgrunnlag['tiltakstype'],
): React.FC<Beregningsgrunnlag> | null {
    if (tiltakstype === 'MENTOR') return UtregningPanelMentorTilskudd;
    if (tiltakstype && tiltakstype !== 'VTAO') return UtregningPanel;
    return null;
}

const BeregningTilskuddOppsummering = (props: Props) => {
    const { arbeidsgiverKid, arbeidsgiverKontonummer, ekstraAvhengigFelter, ...beregningsgrunnlag } = props;
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);

    const avhengigFelter: Partial<Avtaleinnhold> = {
        arbeidsgiveravgift: beregningsgrunnlag.arbeidsgiveravgift,
        otpSats: beregningsgrunnlag.otpSats,
        feriepengesats: beregningsgrunnlag.feriepengesats,
        ...(ekstraAvhengigFelter || {}),
    };

    const UtregningPanelComponent = getUtregningPanelComponentType(avtale.tiltakstype);

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

                {UtregningPanelComponent && (
                    <Row className={styles.row}>
                        <Label>Utregning</Label>
                        <HvaManglerOppsummering avhengigFelter={avhengigFelter}>
                            <VerticalSpacer rem={1} />
                            <UtregningPanelComponent {...beregningsgrunnlag} />
                        </HvaManglerOppsummering>

                        {innloggetBruker.erNavAnsatt &&
                            beregningsgrunnlag.manedslonn100pst &&
                            beregningsgrunnlag.stillingprosent !== undefined &&
                            beregningsgrunnlag.stillingprosent > 0 &&
                            beregningsgrunnlag.stillingprosent < 100 && (
                                <>
                                    <VerticalSpacer rem={1.25} />
                                    <Label>Lønn ved 100% stilling </Label>
                                    {beregningsgrunnlag.manedslonn100pst} kr
                                </>
                            )}
                    </Row>
                )}
            </Container>
        </Stegoppsummering>
    );
};

export default BeregningTilskuddOppsummering;
