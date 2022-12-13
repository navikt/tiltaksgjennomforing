import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Varighet } from '@/types/avtale';
import moment from 'moment';
import { Column, Container, Row } from '@/komponenter/NavGrid/Grid';
import { Label } from '@navikt/ds-react';
import React, { FunctionComponent, useContext } from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import VarighetIkon from './VarighetIkon';

const formaterDato = (dato: string): string => {
    return moment(dato).format('DD.MM.YYYY');
};

const harDato = (dato?: string): string => {
    return dato ? formaterDato(dato).toString() : '';
};

const VarighetOppsummering: FunctionComponent<Varighet> = ({
    startDato,
    sluttDato,
    stillingprosent,
    antallDagerPerUke,
}) => {
    const avtaleContext = useContext(AvtaleContext);

    const stillingProsent = stillingprosent ? stillingprosent.toString() + '%' : '';

    return (
        <Stegoppsummering ikon={<VarighetIkon />} tittel="Dato og arbeidstid">
            <Container fluid={true}>
                <Row className={''}>
                    <Column md="4" sm="6" xs="6">
                        <Label>Startdato</Label>
                        <SjekkOmVerdiEksisterer verdi={harDato(startDato)} />
                        <VerticalSpacer rem={1} />
                    </Column>
                    <Column md="4" sm="6" xs="6">
                        <Label>Sluttdato</Label>
                        <SjekkOmVerdiEksisterer verdi={harDato(sluttDato)} />
                    </Column>
                    {avtaleContext.avtale?.tiltakstype !== 'MENTOR' && (
                        <Column md="4" sm="12" xs="12">
                            <Label>Stillingsprosent</Label>
                            <SjekkOmVerdiEksisterer verdi={stillingProsent} />
                        </Column>
                    )}
                </Row>
                <Row className={''}>
                    <Column md="4" sm="12" xs="12">
                        <Label>Antall dager per uke</Label>
                        <SjekkOmVerdiEksisterer verdi={antallDagerPerUke?.toString()} />
                    </Column>
                </Row>
            </Container>
        </Stegoppsummering>
    );
};

export default VarighetOppsummering;
